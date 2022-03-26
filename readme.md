# Angular Crash Course with Node and Java Backend

## Single Page Applications

In SPAs, the page is loaded only once when the user accesses the application. Everytime the user interacts with the page, a request is sent to the backend but the backend will only be responsible for sending the data appropriate to that request. The frontend will then dynamically refresh the DOM dynamically without refreshing the page.

The disadvantages of using SPA are they are less secure because cross site scripting should be enabled so that the frontend can connect to the backend. Another disadvantage is the possibility of memory leaks.

## Angular

Angular is a SPA framework built with HTML and TypeScript. **Components** are a combination of data and logic and the associated html template which renders the data using the logic. HTML templates can use **Angular Directives** and **Data Binding**. Directives are used to define logic within our html page. Using data binding, we can bind data to the HTML DOM element. There are two types of data binding: Event Binding and Property Binding which binds the html input properties to the model in our Angular component. **Service** is a class we create that is usually used to fetch data from the backend. We can use dependency injection to inject a service into a component which will use the service to fetch data and render to the UI. **Routing** can be used to map url paths to views.

## Components

A component is the key feature of Angular. Using which, we can create html-like elements. A component is a combination of the model and a view. To create a component, we annotate our model class with **@Component**. Within the annotation, we pass in the _selector_ attribute wherein we give the name of our html element. The _templateUrl_ attribute is the html file responsible for rendering the UI for that component. In the following snippet, the model class MyComponent would hold the data and logic, and the html will be responsible for rendering a UI.

```typescript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angularBasics";
}
```

Using angular cli, we can use `ng generate component product` to generate a component with a name of _product_. When we use the angular cli to create a component, it also automatically adds the declaration to our **app.module** file. We can define properties and initialize them using a constructor:

```typescript
export class ProductComponent implements OnInit {
  id: number;
  name: string;
  price: number;

  constructor() {
    this.id = 1;
    this.name = "Legion";
    this.price = 1300;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  ngOnInit(): void {}
}
```

We can access the properties in our html template using the string interpolation syntax.

```html
<h1>{{ getId() }}</h1>
<h1>{{ getName() }}</h1>
<h1>{{ getPrice() }}</h1>
```

#### NgModules

NgModules are the basic building blocks of an Angular application. Every angular application has one root module that bootstraps all the functional modules together. The **AppModule** is where we bootstrap this all together. NgModule defines a compilation context for a set of components and services that address a particular functionality in our application.

The **app.module.ts** is a configuration file for the entire application. _declarations_ is where we put all components in our application. _imports_ will import external modules we need in order for the application to work. _providers_ defines the set of injectable objects that are available in the injector of that module. _bootstrap_ is where we mention the starting point of our application.

```typescript
@NgModule({
  declarations: [AppComponent, ProductComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### ngFor and Arrays

We can use the **ngFor** structural directive (directive that affects the DOM) to loop through arrays. We modify our products component to use an array of products:

```typescript
export class ProductComponent implements OnInit {
  products: any[];

  constructor() {
    this.products = [
      {
        id: "1",
        name: "Macbook",
      },
      {
        id: "2",
        name: "Legion",
      },
    ];
  }

  public getProducts() {
    return this.products;
  }

  ngOnInit(): void {}
}
```

Using the following template, we can display the id and name of each product.

```html
<div *ngFor="let product of products">
  <h1>{{ product.id }}</h1>
  <h1>{{ product.name }}</h1>
</div>
```

A better way would be invoking the getProducts() method.

```html
<div *ngFor="let product of getProducts()">
  <h1>{{ product.id }}</h1>
  <h1>{{ product.name }}</h1>
</div>
```

#### Input Property Binding

If we want to hide an html element, we can use the html attribute hidden. We wrap the attribute with square brackets. We can define a _hide_ flag in our seller component and bind it to the _hidden_ attribute.

```typescript
export class SellerComponent implements OnInit {
  sellers: string[];
  hide: boolean;

  constructor() {
    this.sellers = ["BestBuy", "Apple", "Amazon"];
    this.hide = true;
  }
}
```

```html
<b [hidden]="hide">{{ getSellers() }}</b>
```

#### Output Event Binding

We can add a clickable button to toggle the sellers that we hidden from the previous section. We can do this with output event binding. In this case, we want to handle the _click_ event.

```html
<input type="button" value="toggle" (click)="hide = !hide" />
```

We can also move the logic into a function in our seller component.

```html
<input type="button" value="toggle" (click)="toggle()" />
```

```typescript
  toggle() {
    this.hide = !this.hide;
  }
```
