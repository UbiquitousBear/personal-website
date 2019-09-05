One pattern I regularly use to assert whether an item meets a criteria of conditions is the specification pattern. It is an approach whereby business rules can be easily chained, and simply return `Boolean`.

Broadly speaking, classes which implement this pattern usually have a single method, `isSatisfiedBy(criteria)`. These classes may also implement other chaining functions such as `and(specification)` or `andNot(specification)`.

    	public Boolean isSatisfiedBy(Criteria criteria);
    	public Specification and(Specification specification);
    	public Specification andNot(Specification specification);

These emulate well known `if` statements whilst appropriately separating logic between different contexts, thus making it suitable for use domain-driven designs.

There are however, some criticisms of using this approach:

- No clear guidelines for implementing it (or even when it is most appropriate to do so)
- It can easily become messy.

I personally feel that this pattern best serves scenarios whereby complex business rules need to be applied to make a decision on a subject. A critical example could be authorisation:

    UserHasPermissionSpecification

    	public Boolean isSatisfiedBy(User user)
    	{
    			return this.userHasPermission(user)
    				AND this.userIsNotLoggedOut(user)
    				AND this.userHasRole(user);
    	}

Each of the guards in the check method can be expressed as as Specification. In this case, the holding class becomes a collection of specifications. By building collections of specifications, one could easily build up different scenarios for different business or use cases, leading towards a cleaner architecture.

I don't feel it is worth to implement this pattern for simply cases where `&&` or any other comparison operator/method can offer the same functionality.
