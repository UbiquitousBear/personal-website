## Background

Whilst implementing an 'account tracking' feature in the 'BearBot' IRC Bot project, I recently came across a problem in trying to establish a clean relationship between two entities, `account` and older, more established `info`.

A new feature in the project, under the guise of linking up profiles and federated identities was realised to establish an user's account. This would enable a user to have a `mugshot`, the **most recently updated and active** `info` and other profile details to be linked by a common relationship: `account`.

Currently, when storing a user's info, the system creates a new info entity record with their details and sends it to the persistence layer for storage. In return, when retrieving this information upon request, the system selects the most recently updated info which is active.

## Problem

So, how do I fetch the _most recently updated_ `info` without trawling through potentially thousands of records and loading that one association every time?

As the bot is being used over multiple channels in any given network, it is imperative that it remain as efficient as possible.

## Answers

One might think that an easy solution would be to write a specific query to fetch the latest info tied to an account when fetching the account for a user.

    $qB = $this->createQueryBuilder('a');
    $qB->select('a,i');
    $qB->where('a.nick = :nick')->setParameter('nick', $nick);
    $qB->andWhere('i.active = :active', true);
    $qB->andWhere('i.channel = :channel')->setParameter('channel', $channel);
    $qB->orderBy('i.updatedTimestamp', 'DESC');
    $qB->setMaxResults(1);

Or something like that.

The would result in a specialised query just to fetch the `entity` which didn't satisfy the requirement of that information not always being there; not to mention the obvious bloated run-time complexity involved in the query.

Another option was to perform the filtering later.

    $infoCollection = $account->getInfos();
    $infoChanCollection = $infoCollection->filter(function($info) use ($channel) {
    	return $info->getChannel() == $channel;
    });

    $iterator = $infoChanCollection->getIterator();
    $iterator->uasort(function ($a, $b) {
    	return $a->getUpdatedTimestamp() > $b->getUpdatedTimestamp() ? 1 : -1;
    });

    $infoCollection = new ArrayCollection(iterator_to_array($iterator));
    $info = $infoCollection[0];

This still loads all of the possible associations into memory and just as bad, has a pretty bad run-time complexity. It is dirty.

Doctrine's Collections `Criteria` allows the filtering of associations using an abstract query (not query language) that can be applied to a collection. The brilliant thing about this is how it works:

> "... you can use collection matching interchangeably, independent of in-memory or sql-backed collections"

> [Doctrine Filtering Collections](http://doctrine-orm.readthedocs.org/projects/doctrine-orm/en/latest/reference/working-with-associations.html#filtering-collections)

That is, if the collection is:

- already loaded, the filtering happens in-memory with PHP
- not already loaded, the filtering is passed down to the database level

This is because "Criteria has a limited matching language that works both on the SQL and on the PHP collection level.".

This solves the criteria (!) of not unnecessarily loading every association to find 1 association.

Writing the code for this to happen was very simple:

    $criteria = Criteria::create();

    $criteria->where(Criteria::expr()->eq('active', 1));
    $criteria->andWhere(Criteria::expr()->eq('ircServerChannel', $channel));
    $criteria->orderBy(['modifiedTimestamp' => Criteria::DESC]);

    return $this->infos->matching($criteria);

Writing the Criteria was very simple, simply because most of the methods available to me mimic those found the Doctrine's `QueryBuilder`.
