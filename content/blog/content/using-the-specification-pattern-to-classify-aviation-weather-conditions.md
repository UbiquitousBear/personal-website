In a previous blog post, I introduced the idea of the Specification Pattern, and earlier this year I implemented it in a small project of mine to list weather report information and show pertinent aviation-related information to that weather report.

As noted in the blog post, the pattern helps create contained sets of complex logic which returns a boolean based on a criteria, whilst allowing freedom to configure the behaviour of the criteria against the candidate.

Consider this scenario: let's say that we have a weather condition (`Wx`), the candidate, defined as so:

```typescript
interface Wx {
  readonly visibility: number;
  readonly clouds: WxClouds[];
}

interface WxClouds {
  readonly abbreviation: string;
  readonly altitude: number;
}
```

The actors are ruling agency, which have a set of criteria specifications needed to decide whether something is 'bad' or not. In our code, let's call a method: `isBad(wx: Wx): boolean`. We're not adhering to the domain language to keep this simple.

A ruling agency's rules is that a `Wx` is considered to be classified as bad if the following is met:

- The maximum visibility is 5000 km
- **OR** (
  IF a WxCloud has an abbreviation of 'BKN', then its altitude must be less than '1500'
  **OR** IF a WxCloud has an abbreviation of 'OVC', then its altitude must be less than '1500'
  )

Whilst another's differs:

- The maximum visibility is 4000 km
- **OR** (
  IF a WxCloud has an abbreviation of 'BKN', then its altitude must be less than '1000'
  **OR** IF a WxCloud has an abbreviation of 'OVC', then its altitude must be less than '1000'
  )

... and more.

We could implement two classes which closely resemble each other and explicitly calculates whether the candidate is satisfied by the criteria:

```typescript
class Agency1 {
  public isBad(wx: Wx): boolean {
    return (
      wx.visibility < 5000 ||
      wx.clouds.filter((cloud: WxCloud) => {
        return (
          (cloud.abbreviation === "BKN" && cloud.altitude < 1500) ||
          (cloud.abbreviation === "OVC" && cloud.altitude < 1500)
        );
      }).length > 0
    );
  }
}

class Agency2 {
  public isBad(wx: Wx): boolean {
    return (
      wx.visibility < 4000 ||
      wx.clouds.filter((cloud: WxCloud) => {
        return (
          (cloud.abbreviation === "BKN" && cloud.altitude < 1000) ||
          (cloud.abbreviation === "OVC" && cloud.altitude < 1000)
        );
      }).length > 0
    );
  }
}
```

This might be acceptable if the requirements for the 'classification' were simple (thought I would already pursue an argument for making the code more abstract given the number of similarities between the code snippets). However, let's say that Agency3 comes along, and we need to add another set of requirements that are a mix of `Agency1`'s and `Agency2`'s. I won't post exemplar code for this agency, but as you can imagine, there'd be even more duplicated code and it might look quite messy. The case for making the code more decoupled becomes stronger, _especially if complexity can be reduced and tested separately_.

One way to encapsulate all of this logic was to separate the logical requirements into distinct components. We can distill the requirements, or criteria, into specific yet abstract considerations:

- `Wx` has a maximum visibility
- `Wx` has clouds with an abbreviation and a specific minimum altitude

These two considerations can be composed as `specifications` or a criterion:

```typescript
class MaximumVisibilityKmSpecification {
  constructor(maximumVisibilityKm: number) {}

  public isSatisfiedBy(wx: Wx): boolean {
    return wx.visibilityKm < this.maximumVisibilityKm;
  }
}

class CloudCeilingLessThanSpecification {
  constructor(abbreviation: string, altitude: number) {}

  public isSatisfiedBy(wx: Wx): boolean {
    return (
      wx.clouds.filter(
        (wx: WxClouds): boolean =>
          cloud.abbreviation === this.abbreviation &&
          (cloud.altitude || this.altitude) < this.altitude
      ).length >= 1
    );
  }
}
```

Then, we can group specifications to build a set of criteria, which can be configured for each ruling agency:

```typescript
class Agency1CeilingSpecification {
  public isSatisfiedBy(wx: Wx): boolean {
    return new CloudCeilingLessThanSpecification("BKN", 1500)
      .or(new CloudCeilingLessThanSpecification("OVC", 1500))
      .isSatisfiedBy(wx);
  }
}

class Agency1Ruling {
  public isBad(wx: Wx): string {
    return;
    new MaximumVisibilityKmSpecification(5000)
      .or(new Agency1CeilingSpecification())
      .isSatisfiedBy(wx);
  }
}
```

We have a set of classes which can be easily tested, with minimal moving parts. Further, the ruling class itself doesn't contain the pure logic to ascertain the specification requirements (though in my case, I'm instantiating the specifications, this can be composed by configuration e.g. yaml if so desired). This gives the flexibility in maintaining the business logic surrounding and the flexibility to build upon the specification framework as and when the conditions for rulings change.
