# Angular Crash Course with Node and Java Backend

# Certificate of Completion

![Certificate of Completion](UC-1c7964b5-6f30-4ef3-9bbf-8275db56cc37.jpg)

- [Angular Crash Course with Node and Java Backend](#angular-crash-course-with-node-and-java-backend)
- [Certificate of Completion](#certificate-of-completion)
  - [Single Page Applications](#single-page-applications)
  - [Angular](#angular)
  - [Components](#components)
      - [NgModules](#ngmodules)
      - [ngFor and Arrays](#ngfor-and-arrays)
      - [Input Property Binding](#input-property-binding)
      - [Output Event Binding](#output-event-binding)
  - [Directives](#directives)
      - [ngIf](#ngif)
      - [ngSwitch](#ngswitch)
      - [ngFor](#ngfor)
      - [ngNonBindable](#ngnonbindable)
      - [ngStyle](#ngstyle)
      - [ngClass](#ngclass)
  - [Services](#services)
      - [Posting Data](#posting-data)
      - [Using Multiple Services](#using-multiple-services)
  - [REST API Using ExpressJS](#rest-api-using-expressjs)
      - [Read](#read)
      - [Create](#create)
      - [Update](#update)
      - [Delete](#delete)
  - [Angular Client and Routing](#angular-client-and-routing)
      - [Routing](#routing)
  - [Pipes](#pipes)
      - [async pipe](#async-pipe)
      - [Custom Pipe](#custom-pipe)
  - [Reactive Forms](#reactive-forms)
      - [Default Values and Validation](#default-values-and-validation)
  - [Template Driven Forms](#template-driven-forms)
      - [Two-Way Binding](#two-way-binding)
  - [Custom Directives](#custom-directives)
      - [Attribute Directive](#attribute-directive)
  - [Use Case Back end](#use-case-back-end)
      - [Create Entities](#create-entities)
      - [Create Repositories](#create-repositories)
      - [findFlights API](#findflights-api)
      - [saveReservation API](#savereservation-api)
      - [findReservation](#findreservation)
      - [updateReservation](#updatereservation)
      - [Configure Data Source](#configure-data-source)
      - [Filtering flights](#filtering-flights)
      - [Testing the Save Find and Update Reservation](#testing-the-save-find-and-update-reservation)
      - [CORS](#cors)
  - [Flight Reservation Front End](#flight-reservation-front-end)
      - [Find Flights Component](#find-flights-component)
      - [Display Flights component](#display-flights-component)
      - [Passenger Details Component](#passenger-details-component)
      - [Confirmation Component](#confirmation-component)
  - [Flight Check Front End](#flight-check-front-end)

## Single Page Applications

In SPAs, the page is loaded only once when the user accesses the application. Everytime the user interacts with the page, a request is sent to the backend but the backend will only be responsible for sending the data appropriate to that request. The frontend will then dynamically refresh the DOM dynamically without refreshing the page.

The disadvantages of using SPA are they are less secure because cross site scripting should be enabled so that the frontend can connect to the backend. Another disadvantage is the possibility of memory leaks.

## Angular

Angular is a SPA framework built with HTML and TypeScript. **Components** are a combination of data and logic and the associated html template which renders the data using the logic. HTML templates can use **Angular Directives** and **Data Binding**. Directives are used to define logic within our html page. Using data binding, we can bind data to the HTML DOM element. There are two types of data binding: Event Binding and Property Binding which binds the html input properties to the model in our Angular component. **Service** is a class we create that is usually used to fetch data from the backend. We can use dependency injection to inject a service into a component which will use the service to fetch data and render to the UI. **Routing** can be used to map url paths to views.

## Components

A component is the key feature of Angular. Using which, we can create html-like elements. A component is a combination of the model and a view. To create a component, we annotate our model class with **@Component**. Within the annotation, we pass in the _selector_ attribute wherein we give the name of our html element. The _templateUrl_ attribute is the html file responsible for rendering the UI for that component. In the following snippet, the model class MyComponent would hold the data and logic, and the html will be responsible for rendering a UI. For this section, we work on the _angularBasics_ project.

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

## Directives

Directives are attributes we add to our html elements which will dynamically affect the DOM. Using directives, we can control the way the DOM is generated. There are many built in directives in angular. **ngIf** is used to display an element conditionally. When **ngSwitch** is used, the elements that match the case will be displayed, or also using a default case. **ngFor** is used to iterate a given DOM element based on each element in an array. **ngNonBindable** is used to tell angular not to bind or compile a part of our page. **ngStyle** and **ngClass** are directives useful for styling. For this section, we created a new project _directives_.

#### ngIf

We can use ngIf to dynamically display an element.

```typescript
export class IfComponent implements OnInit {
  x: number;
  y: number;
  s: string;

  constructor() {
    this.x = 10;
    this.y = 20;
    this.s = "success";
  }

  myFunc() {
    return true;
  }

  ngOnInit(): void {}
}
```

```html
<b *ngIf="true">Serialize Yourself.</b><br />
<b *ngIf="x < y">Conditional Logic</b><br />
<b *ngIf="s == 'succ'">Text is Success</b><br />
<b *ngIf="myFunc()">Function call</b><br />
```

#### ngSwitch

We can use ngSwitch to render according to a case. We can also specify a default element using ngSwitchDefault in case none of the cases satisfy.

```html
<div [ngSwitch]="myCase">
  <div *ngSwitchCase="1">Case 1</div>
  <div *ngSwitchCase="2">Case 2</div>
  <div *ngSwitchCase="3">Case 3</div>
  <div *ngSwitchCase="4">Case 4</div>
  <div *ngSwitchDefault>Default Case</div>
</div>
```

```typescript
@Component({
  selector: "app-switch",
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.css"],
})
export class SwitchComponent implements OnInit {
  myCase: number;

  constructor() {
    this.myCase = 7;
  }

  ngOnInit(): void {}
}
```

#### ngFor

Using ngFor, we can iterate through an array. We can also iterate through an array of objects as well.

```html
<div *ngFor="let course of courses">
  <b>{{ course }}</b>
</div>

<br />

<table>
  <thead>
    <tr>
      <td>First Name</td>
      <td>Last Name</td>
      <td>Score</td>
    </tr>
  </thead>
  <tr *ngFor="let student of students">
    <td>{{ student.fName }}</td>
    <td>{{ student.lName }}</td>
    <td>{{ student.score }}</td>
  </tr>
</table>
```

```typescript
export class ForComponent implements OnInit {
  courses: string[];
  students: any[];

  constructor() {
    this.courses = ["Angular", "React", "Node"];
    this.students = [
      {
        fName: "John",
        lName: "Doe",
        score: 90,
      },
      {
        fName: "Bob",
        lName: "Doge",
        score: 100,
      },
    ];
  }

  ngOnInit(): void {}
}
```

#### ngNonBindable

ngNonBindable is used so that angular will not bind the template. This will return `The code that renders the above is: {{ course }}`

```html
<div ngNoneBindable>The code that renders the above is: {{ course }}</div>
```

#### ngStyle

We can use the following syntax to set a single css property.

```html
<td [style.color]="'red'">{{ student.fName }}</td>
<td [style.color]="'yellow'">{{ student.lName }}</td>
<td [style.color]="'blue'">{{ student.score }}</td>
```

To style multiple properties, we can use ngStyle. It is important to wrap the background-color in '' because it is not a single word.

```html
<td [ngStyle]="{ color: 'red', 'background-color': 'blue' }">First Name</td>
```

We can also style dynamically with ngStyle.

```html
<td [ngStyle]="{ color: color }">Last Name</td>
<td [style.font-size.px]="fontSize">Score</td>
```

```typescript
export class ForComponent implements OnInit {
  color: string;
  fontSize: string;

  constructor() {
    this.color = 'green';
    this.fontSize = '40';

  ngOnInit(): void {}
}
```

#### ngClass

The ngClass directive allows us to assign a css class to an html element. We assign an object literal as a value to ngClass. This object literal contains the css class name as a key and a boolean as a value.

```html
<td [ngClass]="{ tdata: true }">{{ student.score }}</td>
```

```css
.tdata {
  font-size: 80px;
}
```

We can also use ngClass to dynamically pass in an object value. This applies the class tdata to the element whenever useTdata is true.

```html
<td [ngClass]="classObj">{{ student.score }}</td>
```

```typescript
export class ForComponent implements OnInit {
  courses: string[];
  students: any[];
  color: string;
  fontSize: string;
  useTdata: boolean;
  classObj: Object;

  constructor() {
    this.useTdata = true;
    this.classObj = {
      tdata: this.useTdata,
    };
```

## Services

When we build huge applications, the code is spread across components. For example, a Login Component HAS A Login Service. To use the Login Service in our Login Component, we can instantiate it using **new**. Instead of manually injecting the dependency, we can delegate that responsibility to Angular. Automatically at run time, the Login Service will be created and injected into the Login Component as a field.

To do dependency injection in Angular, we first need to register the dependency in our **NgModule** or **app.module.ts** in the _providers_ section.

```typescript
@NgModule({
  providers: [LoginService]
})
```

To inject, we provide a constructor in the component that needs the dependency.

```typescript
import { LoginService } from "../services/user.service";
class LoginComponent {
  constructor(private loginService: LoginService);
}
```

In this section, we will be working with the _countries_ project. We can create a service using `ng generate service services/countries`. The **@Injectable** decorator tells angular that the service class can be created at runtime and should be injected into other components or classes when required. The _providedIn_ property means that angular should use the root dependency injection module. In the following snippet, we inject **HttpClient** into CountrieService. HttpClient comes with various methods to perform http requests.

```typescript
@Injectable({
  providedIn: "root",
})
export class CountriesService {
  constructor(private _httpClient: HttpClient) {}

  public getCountries(): any {
    return this._httpClient.get(
      "http://api.countrylayer.com/v2/all?access_key=API_KEY"
    );
  }
}
```

It is important to ntoe that the HttpClient methods returns an **Observable**. In our countries component, we need to import the CountriesService and inject it using the constructor. To retrieve the data from an observable, we can use **subscribe()** method.

```typescript
@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.css"],
})
export class CountriesComponent implements OnInit {
  public data: any;

  constructor(private _service: CountriesService) {}

  ngOnInit(): void {
    return this._service.getCountries().subscribe(
      (response: any) => {
        this.data = response;
        console.log(this.data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
```

Afterwards, we need to import HttpClientModule and CountriesService into our app.module. This way, angular will know that our project will need the HttpClientModule. Angular will also create objects of CountriesService and inject it wherever required.

```typescript
@NgModule({
  declarations: [AppComponent, CountriesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [CountriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

We use the following template

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Capital</th>
      <th>Region</th>
      <th>Alt Spellings</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let c of data">
      <td>{{ c.name }}</td>
      <td>{{ c.capital }}</td>
      <td>{{ c.region }}</td>
      <td>{{ c.altSpellings }}</td>
    </tr>
  </tbody>
</table>
```

#### Posting Data

In this section, we will be working on the _postService_ application which can send in a string to a rest API, and the rest service will be invoked wherein the string will be capitalized. This way, we will learn how to make a POST request. For the service, we start by creating a method convertToUppercase(). This method takes an object and returns a json back.

```typescript
export class UppercaseConverterService {
  constructor(private _httpClient: HttpClient) {}

  public convertToUppercase(obj: any): any {
    return this._httpClient.post(
      "http://test-routes.herokuapp.com/test/uppercase",
      obj
    );
  }
}
```

Afterwards, we implement the component.

```typescript
export class UppercaseConverterComponent implements OnInit {
  public result: any;
  public my_message: any;

  constructor(private _service: UppercaseConverterService) {}

  ngOnInit(): void {}

  public convert(obj: any): any {
    this._service.convertToUppercase(obj).subscribe(
      (res: any) => (this.result = res),
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }
}
```

We use the following html template. Here we use input property binding to a model object. **ngModel** directive takes the value of the text field and assign it to the _my_message_ variable. We then take that value and pass it into the click event binder of the button which fires the _convert()_ method. Using the pipe ` | json`, we can format the result beautifully.

```html
<input type="text" [(ngModel)]="my_message" />
<button (click)="convert({ message: my_message })">Submit</button>
<br />
<h1 style="color: red">{{ result | json }}</h1>
```

Afterwards, we need to update app.module and add the imports for HttpClientModule and FormsModule. We need to also provide the UppercaseConverterService.

```typescript
@NgModule({
  declarations: [AppComponent, UppercaseConverterComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [UppercaseConverterService],
  bootstrap: [UppercaseConverterComponent],
})
export class AppModule {}
```

#### Using Multiple Services

In this section, we will be working with _multipleServices_. Here we will be creating two services.

```typescript
export class CustomerServiceService {
  constructor(private _httpClient: HttpClient) {}

  public getCustomers(): any {
    return this._httpClient.get(
      "https://www.w3schools.com/angular/customers.php"
    );
  }
}

export class HelloServiceService {
  constructor(private _httpClient: HttpClient) {}

  public helloService(): any {
    return this._httpClient.get("http://test-routes.herokuapp.com/test/hello");
  }
}
```

We then use the services in our component and invoke the methods.

```typescript
export class MultipleServicesComponent implements OnInit {
  public helloResponse: any;
  public customerResponse: any;

  constructor(
    private _helloService: HelloServiceService,
    private _customerService: CustomerServiceService
  ) {}

  ngOnInit(): void {
    this._helloService.helloService().subscribe((res: any) => {
      this.helloResponse = res;
    });
    this._customerService.getCustomers().subscribe((res: any) => {
      this.customerResponse = res;
    });
  }
}
```

We will use the following html template. Here we use a json pipe to render json beautifully.

```html
<h1>{{ helloResponse | json }}</h1>
<h2>{{ customerResponse | json }}</h2>
```

Then we configure our app.module

```typescript
@NgModule({
  declarations: [AppComponent, MultipleServicesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [HelloServiceService, CustomerServiceService],
  bootstrap: [MultipleServicesComponent],
})
export class AppModule {}
```

We can make parallel calls using **forkJoin** from rxjs. This forkJoin method takes an array of service calls

```typescript
  ngOnInit(): void {
    forkJoin([
      this._helloService.helloService(),
      this._customerService.getCustomers(),
    ]).subscribe((response) => {
      this.helloResponse = response[0];
      this.customerResponse = response[1];
    });
  }
```

## REST API Using ExpressJS

Node is a javascript framework that allows us to create server-side applications using javascript. Expressjs is a Node module. The important modules that will be used in this section are express, and mysql for connecting with the database.

We start with creating the database in MySQL and then creating the config to establish a database connection. `db_connection.js` will be responsible for creating the database connection and `db_properties.js` will store the connection information. We create the anonymous function getConnection which returns a mysql connection.

```sql
use mydb;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
create table product(id int,name varchar(20),description varchar(20),price int);

select * from product;
```

```javascript
// db_properties.js
module.exports = {
  host: "localhost",
  user: "root",
  password: "1234",
  dbName: "mydb",
};

// db_connection.js
const dbProps = require("./db_properties");
const mysql = require("mysql");

module.exports = {
  getConnection: () => {
    return mysql.createConnection({
      host: dbProps.host,
      user: dbProps.user,
      password: dbProps.password,
      database: dbProps.dbName,
    });
  },
};
```

Afterwards, we create the controller for the REST api. The controller will use the dbConnection module and express router to create routes for our RESTful endpoint methods. Using the connection object, we can call the **connect()** method and we also create a router object using **express.Router()**. We then start on implementing the READ endpoint.

#### Read

```javascript
const dbcon = require("../config/db_connection");
const express = require("express");

const connection = dbcon.getConnection();

connection.connect();
const router = express.Router();

router.get("/", (req, res) => {
  connection.query("select * from product", (err, records, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.send(records);
    }
  });
});

module.exports = router;
```

To initialize our REST application, we can create a bootstrap file `server.js` that will kickstart our application. The first step is to configure the path to our RESTful API using express **use()**. The uri `/api/products` will be mapped to our product controller. Using **listen()** we can start the server on port 8080.

```javascript
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

const productApi = require("./controllers/product.controller");
app.use("/api/products", productApi);

app.listen(8080);
console.log("Server up and running on PORT 8080");
```

To test, we can run `node server.js`. Now we can try using postman to make a GET request to `localhost:8080/api/products`. At this point, we will receive an empty array as a response.

We can retrieve a specific product by creating an endpoint with a path parameter. We can use the id that we will be receiving from the `req` params.

```javascript
router.get("/:id", (req, res) => {
  connection.query(
    `select * from product where id=${req.params.id}`,
    (err, records, fields) => {
      if (err) {
        console.error(err);
      } else {
        res.send(records);
      }
    }
  );
});
```

#### Create

For the create operation, we need to use express router **post()** method.

```javascript
router.post("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  connection.query(
    `insert into product values(${id}, '${name}', '${description}', ${price})`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ insert: "success" });
      }
    }
  );
});
```

We can use express.json() to deserialize the json, thereby removing the need to use body-parser.

```javascript
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

#### Update

For the update operation, we can use the following

```javascript
router.put("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  connection.query(
    `update product set name='${name}', price=${price} where id=${id}`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ update: "success" });
      }
    }
  );
});
```

#### Delete

Finally, for delete operations, we can use the **delete()** method.

```javascript
router.delete("/:id", (req, res) => {
  connection.query(
    `delete from product where id=${req.params.id}`,
    (err, records, fields) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ delete: "success" });
      }
    }
  );
});
```

## Angular Client and Routing

In this section, we created an Angular client which will be consuming the restful api created in the previous section. We start with creating the service.

```typescript
export class ProductDataService {
  url: string = "localhost:8080/api/products/";

  constructor(private _httpClient: HttpClient) {}

  public getProducts(): any {
    return this._httpClient.get(this.url);
  }

  public getProduct(id: number): any {
    return this._httpClient.get(`${this.url}${id}`);
  }

  public create(product: any): any {
    return this._httpClient.post(this.url, product);
  }

  public update(product: any): any {
    return this._httpClient.put(this.url, product);
  }

  public delete(id: number): any {
    return this._httpClient.delete(`${this.url}${id}`);
  }
}
```

Afterwards we create the component and view. For the components, we split each operation into its own component.

```typescript
export class AppComponent {
  public products: any;
  constructor(private _service: ProductDataService) {}

  ngOnInit() {
    this._service.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }
}

export class CreateComponent implements OnInit {
  public createResponse: any;
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public createProduct(product: any) {
    this._service.create(product).subscribe((res: any) => {
      this.createResponse = res;
    });
  }
}

export class UpdateComponent implements OnInit {
  public updateResponse: any;
  public id!: number;
  public name!: string;
  public price!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public updateProduct(product: any) {
    this._service.update(product).subscribe((res: any) => {
      this.updateResponse = res;
    });
  }
}

export class FetchComponent implements OnInit {
  public getProductResponse: any;
  public id!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public getProduct(id: number) {
    this._service.getProduct(id).subscribe((res: any) => {
      this.getProductResponse = res;
    });
  }
}

export class DeleteComponent implements OnInit {
  public deleteResponse: any;
  public id!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public deleteProduct(id: number) {
    this._service.delete(id).subscribe((res: any) => {
      this.deleteResponse = res;
    });
  }
}
```

```html
<h1>Create Product</h1>
Id: <input type="number" [(ngModel)]="id" /> <br />
Name: <input type="text" [(ngModel)]="name" /> <br />
Description: <input type="text" [(ngModel)]="description" /> <br />
Price: <input type="number" [(ngModel)]="price" /> <br />
<button
  (click)="
    createProduct({
      id: id,
      name: name,
      description: description,
      price: price
    })
  "
>
  Create
</button>

<h1>{{ createResponse | json }}</h1>
```

```html
<h1>Delete Product</h1>
Id: <input type="number" [(ngModel)]="id" /> <br />
<button (click)="deleteProduct(id)">Delete Product</button>

<h1>{{ deleteResponse | json }}</h1>
```

```html
<h1>Fetch Product</h1>
Id: <input type="number" [(ngModel)]="id" /> <br />
<button (click)="getProduct(id)">Get Product</button>

<h1>{{ getProductResponse | json }}</h1>
```

```html
<h1>Update Product</h1>
Id: <input type="number" (ngModel)="(id)" /> <br />
Name: <input type="text" (ngModel)="(name)" /> <br />
Price: <input type="number" (ngModel)="(price)" /> <br />
<button
  (click)="
    updateProduct({
      id: id,
      name: name,
      price: price
    })
  "
>
  Update
</button>

<h1>{{ updateResponse | json }}</h1>
```

We make sure to update our configuration as well

```typescript
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    FetchComponent,
    DeleteComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [ProductDataService],
  bootstrap: [AppComponent],
})
```

At this point, all methods are crammed into one component and there are no routing.

#### Routing

Routing is what applications do when a user navigates from webpage to webpage. Routing in angular is achieved dusing @angular/RouterModule. The **Routes** represents all the navigation links in our application. **RouterOutlet** component shows angualr where to place the content of each route. **RouterLink** is used to add links to our html pages.

We can implement routing by following 3 steps:

1. Create routing.module.ts
2. Create <router-outlet> in HTML
3. Import routing.module.ts into AppModule

We start by defining a routes array which is of type **Routes** in our routing.module.ts. To configure the router itself, we need to annotate the class with **@NgModule()**. In here, we define an import for **RouterModule** which will initialize all the routes. The _pathMatch: full_ property means that the url should exactly match the route.

```typescript
const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "create", component: CreateComponent },
  { path: "update", component: UpdateComponent },
  { path: "fetch", component: FetchComponent },
  { path: "delete", component: DeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
```

Afterwards we configure the app.module.ts to include an import for the router module.

```typescript
imports: [BrowserModule, HttpClientModule, FormsModule, AppRouterModule],
```

We can use the routes in our html template at this point. Here we use the **routerLink** directive from angular. The **router-outlet** is responsible for resolving the links.

```html
<h1>Products:</h1>
<h1>{{ products | json }}</h1>

<a [routerLink]="'/create'">Create Product</a><br />
<a [routerLink]="'/update'">Update Product</a><br />
<a [routerLink]="'/fetch'">Fetch Product</a><br />
<a [routerLink]="'/delete'">Delete Product</a><br />

<router-outlet></router-outlet>
```

## Pipes

Pipes are used to transform data in our html template files. We can also format data inside our typescript model files if we want to use them in multiple places. There are three different text pipes: titlecase, uppercase, lowercase. The **date** pipe can be used to format the date type. It expects a string pattern or a preset string.

```html
<!-- 01-04-2022 -->
<h1>{{ myDate | date: 'dd-MM-yy'}}</h1>
<!-- 01-04-22 -->
<h1>{{ myDate | date: 'dd-MM-yy'}}</h1>
<!-- 4/1/22 -->
<h1>{{ myDate | date: "shortDate" }}</h1>
```

The **currency** pipe, helps us format numeric values as money. It expects a three character code for the country

```html
<!-- ??1,200 -->
<h1>{{ myMoney | currency: "JPY" }}</h1>
```

The **json** pipe converts a javascript object into json string.

```html
<!-- { "name": "Doge", "salary": 1000 } -->
<h1>{{ myObj | json }}</h1>
```

The **number** pipe uses the following syntax: `number:"{minIntDigits.{minDecDigits}-{maxDecDigits}}"`

```html
<!-- myNumber: number = 1000.12345; -->
<!-- 01,000.123 -->
<h1>{{ myNumber | number:'5.2-3' }}</h1>
```

The **percent** pipe converts a given number into percentage and appends the % symbol. We can also use the formatting from the number pipe.

```html
<!-- 350% -->
<h1>{{ stock | percent }}</h1>
<!-- 350.0% -->
<h1>{{ stock | percent: "3.1-2" }}</h1>
```

The **slice** pipe is used on array to slice it according to the starting index and ending index. A negative value can be used to indicate an offset from the end. We can also use the slice in a for loop.

```html
<!-- numbers: number[] = [10, 20, 30, 40, 50]; -->
<!-- 30,40 -->
<h1>{{ numbers | slice: 2:4 }}</h1>
<!-- 304050 -->
<b *ngFor="let v of numbers | slice: 2">{{ v }}</b>
```

#### async pipe

An async pipe is very useful when we are dealing with promises or observables. We can directly use the promises returned from a backend call in the html template. We first write out a function call that returns a promise

```typescript
  constructor() {
    this.getPromise().then((v) => (this.promiseResponse = v));
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Hello Doge'), 2000);
    });
  }
```

```html
<h1>{{ promiseResponse }}</h1>
```

We can use async pipes instead to deal with the promise directly in our html template. This way, the amount of code we write in the model class is reduced.

```typescript
  promise: Promise<any>;

  constructor() {
    this.promise = this.getPromise();
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Hello Doge'), 2000);
    });
  }
```

```html
<h1>{{ promise | async }}</h1>
```

#### Custom Pipe

In this section, we create a pipe that reverses a string. To create a pipe, we use `ng generate pipe <name>`. This command automatically creates the file, and also adds the pipe to our app's declarations. Every pipe is a typescript class that implements PipeTransform from angular.

```typescript
@Pipe({
  name: "reversepipe",
})
export class ReversepipePipe implements PipeTransform {
  transform(input: string): any {
    let data = "";
    for (let i = 0; i < input.length; i++) {
      data = input[i] + data;
    }
    return data;
  }
}
```

```html
<!-- .txEn eht nepO -->
<h1>{{ "Open the nExt." | reversepipe }}</h1>
```

## Reactive Forms

In model driven forms, we create the model first before the html. We then bind the html form to the model using directives. We create Reactive Forms using the **ReactiveFormsModule** which uses **FormGroup** and **FormControl** objects. The FormGroup represents an html form and the FormControl represents the input elements we use within an html form. The FormGroup and FormControl will have a state wherein the FormControl will maintain the state of each input element which also allows us to do validation. In the same manner, the state of the FormGroup is the state of the collection of all FormControls.

In this section, we will create a form that will retrieve the name, email, address and gender of the person. The project used will be under _reactiveForms_. We start with creating the model. We define a FormGroup constructor, wherein we define our FormControls. For the address property, we define it as a subgroup within which we define street, city, country.

```typescript
export class AppComponent {
  public personForm!: FormGroup;
  public countries: string[] = ["USA", "Japan", "Philippines"];

  ngOnInit() {
    this.personForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        country: new FormControl(),
      }),
    });
  }

  handleSubmit() {
    console.log(this.personForm.value);
  }
}
```

We then make sure that we include **ReactiveFormsModule** in our NgModule import.

```typescript
imports: [BrowserModule, ReactiveFormsModule],
```

Afterwards, we can proceed with creating the view. Here we used bootstrap. We bind the form element to the form object we defined in our model class using the **[formGroup]** directive. To bind an input to our model, we use **formControlName**. We use **formGroupName** to bind a subgroup, in this case, address. The onSubmit handler will be defined in the form tag.

```html
<div class="container">
  <form [formGroup]="personForm" (ngSubmit)="handleSubmit()">
    <div class="form-group">
      <label>First Name: </label>
      <input type="text" class="form-control" formControlName="firstName" />
    </div>
    <div class="form-group">
      <label>Last Name: </label>
      <input type="text" class="form-control" formControlName="lastName" />
    </div>
    <div class="form-group">
      <label>Email: </label>
      <input type="text" class="form-control" formControlName="email" />
    </div>
    <div class="form-group">
      <label>Gender: </label>
      <input
        type="radio"
        class="form-control"
        value="male"
        formControlName="gender"
      />Male
      <input
        type="radio"
        class="form-control"
        value="female"
        formControlName="gender"
      />Female
    </div>

    <div class="form-group" formGroupName="address">
      <div class="form-group">
        <label>Street: </label>
        <input type="text" class="form-control" formControlName="street" />
      </div>
      <div class="form-group">
        <label>City: </label>
        <input type="text" class="form-control" formControlName="city" />
      </div>
      <div class="form-group">
        <label>Country: </label>
        <select type="text" class="form-control" formControlName="country">
          <option *ngFor="let country of countries" value="{{ country }}">
            {{ country }}
          </option>
        </select>
      </div>
      <div>
        <input type="submit" class="btn btn-success" />
      </div>
    </div>
  </form>
</div>
```

#### Default Values and Validation

We can also set default values using our model class using the FormControl constructor. The second parameter of the constructor is an array of validators.

```typescript
      firstName: new FormControl('Doge', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
```

When validation fails, angular will bind the errors to that particular field, which we can access in our html page.

```html
<div
  class="alert alert-danger"
  *ngIf="personForm.controls['firstName'].hasError('required')"
>
  First Name cannot be empty
</div>
<div
  class="alert alert-danger"
  *ngIf="personForm.controls['firstName'].hasError('minlength')"
>
  Minimum three characters
</div>
<div
  class="alert alert-danger"
  *ngIf="personForm.controls['firstName'].hasError('maxlength')"
>
  Maximum of ten characters
</div>
```

## Template Driven Forms

Template Driven forms are itnernally Model Driven, but they are driven by the directives in the html instead of in the model. In Template Driven, we start with html using directives and we will drive the model from there. The FormsModule gives us the **ngForm** object which internally creates a FormGroup object. To associate a FormControl to this FormGroup, we use the **ngModel** and **name** directives. ngModel creates a FormControl object for the input and name will map it to a property on the model.

For this section, we will be working on the templateForms project. We start by adding **FormsModule** in our app.module imports. Afterwards, we create the template form. We use `#` to define a template driven form. For the form fields, we use **ngModel** to perform two way binding and to tell angular that it should create a FormControl with the name we assigned to the _name_ property and bind it to the model.

For the subgroup, we use the **ngModelGroup** directive. For submit, we use **(ngSubmit)** wherein we pass the form information.

```html
<div class="container">
  <form #personForm="ngForm" (ngSubmit)="handleSubmit(personForm.value)">
    <div>
      <label>First Name</label>
      <input type="text" name="firstName" ngModel />

      <label>Last Name</label>
      <input type="text" name="lastName" ngModel />

      <label>Email</label>
      <input type="text" name="email" ngModel />

      <label>Gender</label>
      <input type="radio" name="gender" value="male" ngModel />Male
      <input type="radio" name="gender" value="female" ngModel />Female
    </div>

    <div ngModelGroup="address">
      <label>Street</label>
      <input type="text" name="street" ngModel />
      <label>City</label>
      <input type="text" name="city" ngModel />
      <label>Country</label>
      <select name="country" ngModel>
        <option value="usa">USA</option>
        <option value="japan">Japan</option>
        <option value="philippines">Philippines</option>
      </select>
    </div>
    <div>
      <input type="submit" />
    </div>
  </form>
</div>
```

```typescript
export class AppComponent {
  title = "templateForms";

  public handleSubmit(data: any) {
    console.log(data);
  }
}
```

#### Two-Way Binding

We need to define the properties in the model for our application. Each of the field represents an input in the ui, and when submitted it should be bound to these properties.

```typescript
export class AppComponent {
  public firstName: string = "Doge";
  public lastName!: string;
  public email!: string;
  public street!: string;
  public city!: string;
  public country!: string;
  public gender!: string;

  public handleSubmit(data: any) {
    console.log(data);
  }
}
```

In the template, we can define two way binding with `[(ngModel)]="propertyName"`

```html
<label>First Name</label>
<input type="text" name="firstName" [(ngModel)]="firstName" />
```

This time, once we refresh the page, we can see that the input field for the first field will be prepopulated with the value we defined in the model property firstName. Using this, we can pre-populate values.

## Custom Directives

We can create our own custom directives as well. For this section, we work on the _customdirectives_ proejct. To create a directive, we use the command `ng g d <name>` which will create the directive and update the app module. Each custom directive is marked with the **@Directive** annotation and within it, the selector is how we use the directive in our template.

Once we create the directive, we can use the TemplateRef and ViewContainerRef to manipulate the dom. We do this by injecting in the constructor. Afterwards, we can proceed with implementing the logic. In this case, we display an element if a condition evaluates to true. We use **set** and pass into it a parameter boolean. The **ViewContainerRef** is the container to which we add views and its **createEmbeddedView()** method can be used to create a dom element dynamically. The **TemplateRef** always points to the html component on which the directive is being used. The **@Input()** decorator is used to receive an input.

```typescript
@Directive({
  selector: "[appMyIf]",
})
export class MyIfDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private container: ViewContainerRef
  ) {}

  @Input() set appMyIf(condition: boolean) {
    if (condition) {
      this.container.createEmbeddedView(this.templateRef);
    } else {
      this.container.clear();
    }
  }
}
```

We can then proceed our custom directive in the html template.

```html
<div *appMyIf="true">
  <b>Serialize Yourself</b>
</div>
```

We created another custom directive wherein we display an html element a number of times, similar to ngFor. This time, we specify a custom name _myCustomLoop_ hence we need to specify in the @Input decorator our selector.

```typescript
@Directive({
  selector: "[appMyLoop]",
})
export class MyLoopDirective {
  constructor(
    private container: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input("appMyLoop") set myCustomLoop(num: number) {
    for (let i = 0; i < num; i++) {
      this.container.createEmbeddedView(this.templateRef);
    }
  }
}
```

```html
<ul>
  <li *appMyLoop="4">Close the World.</li>
</ul>
```

#### Attribute Directive

We can also create our own custom Attribute Directives. The directive we create will apply some styles to our html element. For an attribute directive, we inject **ElementRef** into the constructor. This points to the current element for which the directive is being used.

```typescript
@Directive({
  selector: "[appMyStyles]",
})
export class MyStylesDirective {
  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.color = "red";
    elRef.nativeElement.style.backgroundColor = "yellow";
    elRef.nativeElement.style.fontSize = "30px";
  }
}
```

```html
<h1 appMyStyles>.txEn eht nepO</h1>
```

We can also pass values to the attribute directive and use it to style. We first need to define a field in our directive. For this field, we need to use the **@Input()** decorator. We need to use the directive after the template is rendered, so we use the ngAfterViewInit() lifecycle method.

```typescript
export class MyStylesDirective {
  @Input() fontSize!: string;

  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.color = "red";
    elRef.nativeElement.style.backgroundColor = "yellow";
    elRef.nativeElement.style.fontSize = "30px";
  }

  ngAfterViewinit(): void {
    this.elRef.nativeElement.style.fontSize = this.fontSize;
  }
}
```

```html
<h1 appMyStyles fontSize="80px">.txEn eht nepO</h1>
```

We can also use handle html events and bind methods to them using our attribute directive. We can do so using the **@HostListener()** decorator which listens to an event.

```typescript
  @HostListener('mouseenter') onMouseEnter() {
    this.elRef.nativeElement.style.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elRef.nativeElement.style.backgroundColor = 'green';
  }
```

## Use Case Back end

In the ue case for this project, we created a flight reservation and checkin app. Both applications will use a RESTful backend using Java Spring Boot. We start by creating the DB schema in mysql.

```sql
CREATE DATABASE RESERVATION;
USE RESERVATION;

CREATE TABLE FLIGHT
(
  ID INT  NOT NULL AUTO_INCREMENT,
  FLIGHT_NUMBER VARCHAR(20)  NOT NULL,
  OPERATING_AIRLINES VARCHAR(20)  NOT NULL,
  DEPARTURE_CITY VARCHAR(20)  NOT NULL,
  ARRIVAL_CITY VARCHAR(20)  NOT NULL,
  DATE_OF_DEPARTURE DATE  NOT NULL,
  ESTIMATED_DEPARTURE_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
);

CREATE TABLE PASSENGER
(
  ID         INT NOT NULL AUTO_INCREMENT,
  FIRST_NAME       VARCHAR(256),
  LAST_NAME    VARCHAR(256),
  MIDDLE_NAME   VARCHAR(256),
  EMAIL VARCHAR(50),
  PHONE VARCHAR(10),
  PRIMARY KEY (ID)
);

CREATE TABLE RESERVATION
(
  ID INT NOT NULL AUTO_INCREMENT,
  CHECKED_IN TINYINT(1),
  NUMBER_OF_BAGS INT,
  PASSENGER_ID INT,
  FLIGHT_ID INT,
  CREATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID),
  FOREIGN KEY (PASSENGER_ID) REFERENCES PASSENGER(ID) ON DELETE CASCADE,
  FOREIGN KEY (FLIGHT_ID) REFERENCES FLIGHT(ID)
);

SELECT * FROM PASSENGER ;
SELECT * FROM FLIGHT;
SELECT * FROM RESERVATION;
```

#### Create Entities

Afterwards we create the flight services API using Spring Boot. The necessary dependencies are Spring Web, Spring Data JPA, MySQL Driver. After creating the project, we create the JPA entities that will represent the database tables and their columns. In order for the model class to become JPA entities, we need to mark them with the **Entity** annotation. We also need to mark the id field with **@Id** with a **@GeneratedValue** identity strategy. We can define this in a single abstract entity instead which we map with **@MappedSuperclass**.

We also need to define the relationship between the passenger, flight and reservation. In the database, the reservation uses the passenger and flight id. We need to mark these fields as **@OneToOne** because each reservation will have only one flight and one passenger. This tells the JPA framework that whenever we save a reservation, the flight and passenger information must be saved into the reservation table, and if the passenger does not exist in the database, a row will be created in its table and that primary key will be saved in the reservation table as a foreign key.

```java
@MappedSuperclass
public class AbstractEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
}

@Entity
public class Flight extends AbstractEntity {
	private String flightNumber;
	private String operatingAirlines;
	private String departureCity;
	private String arrivalCity;
	private Date dateOfDeparture;
	private Timestamp estimatedDepartureTime;
}

@Entity
public class Passenger extends AbstractEntity {
	private String firstName;
	private String lastName;
	private String middleName;
	private String email;
	private String phone;
}

@Entity
public class Reservation extends AbstractEntity {
	private boolean checkedIn;
	private int numberOfBags;
	@OneToOne
	private Flight flight;
	@OneToOne
	private Passenger passenger;

	public Flight getFlight() {
		return flight;
	}
}
```

#### Create Repositories

Afterwards, we proceed with creating the repositories which will perform the CRUD operations against the database. These repositories will be interfaces that extends the **JpaRepository** interface from Spring Data.

```java
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

}

public interface PassengerRepository extends JpaRepository<Passenger, Integer> {

}

public interface FlightRepository extends JpaRepository<Flight, Integer> {

}
```

#### findFlights API

The findFlights method will be used to get a list of flights available from the database. We can proceed with creating the ReservationRestController that uses the repositories we created earlier to access the database. We need to annotate this class with **@RestController** from Spring to make it a RESTful controller. We then autowire our FlightRepository using the **@Autowired** annotation which tells Spring to create an implementation of the repository dynamically at runtime and inject it. We specify a method _findFlights()_ and bind it at the `/flights` endpoint.

We also created a findFlight method which will return a flight according to id. The path variable {id} will be injected in this case to the param id.

```java
@RestController
public class ReservationRestController {

	@Autowired
	FlightRepository flightRepository;

	@RequestMapping(value="/flights", method = RequestMethod.GET)
	public List<Flight> findFlights() {
		return flightRepository.findAll();
	}

  @RequestMapping(value="/flights/{id}", method=RequestMethod.GET)
	public Flight findFlight(@PathVariable("id") int id) {
		return flightRepository.findById(id).get();
	}
}
```

#### saveReservation API

The saveReservations method will be a POST method at `/reservations` and will be used to add a reservation to the existing collection of reservations. We start by creating a CreateReservationRequest DTO class which contains the fields required to create a reservation.

```java
public class CreateReservationRequest {
	private int flightId;
	private String passengerFirstName;
	private String passengerLastName;
	private String passengerMiddleName;
	private String passengerEmail;
	private String passengerPhone;
	private String cardNumber;
	private String expirationDate;
	private String securityCode;
}
```

Afterwards we can create the saveReservation method and map it to `/reservations`. Here we start with retrieving the flight id, and then creating a new Passenger object based on the reservation request details. Afterwards, the PassengerRepository will be used to save the passenger object to the database. Once we have the flight information and passenger information, we can now create the reservation object. We pass the flight and passenger information to the reservation object, and finally save it to the database using the ReservationRepository. It is important to mark this method with **@Transactional** from Spring since we have multiple saves going on and this annotation signifies that either all save operations should happen OR non should happen, in case one fails.

```java
@RestController
public class ReservationRestController {

	@Autowired
	FlightRepository flightRepository;

	@Autowired
	PassengerRepository passengerRepository;

	@Autowired
	ReservationRepository reservationRepository;

	@RequestMapping(value="/reservations", method = RequestMethod.POST)
  @Transactional
	public Reservation saveReservation(@RequestBody CreateReservationRequest request) {
        // find the flight based on request flight id
		Flight flight = flightRepository.findById(request.getFlightId()).get();

		// create a passenger object based on the request object
		Passenger passenger = new Passenger();
		passenger.setFirstName(request.getPassengerFirstName());
		passenger.setLastName(request.getPassengerLastName());
		passenger.setMiddleName(request.getPassengerMiddleName());
		passenger.setEmail(request.getPassengerEmail());
		passenger.setPhone(request.getPassengerPhone());

		// save passenger to database
		Passenger savedPassenger = passengerRepository.save(passenger);

		// create the reservation
		Reservation reservation = new Reservation();
		reservation.setFlight(flight);
		reservation.setPassenger(savedPassenger);
		reservation.setCheckedIn(false);

		// save the reservation to database
		Reservation savedReservation = reservationRepository.save(reservation);

		return savedReservation;
	}
}
```

#### findReservation

The findReservation method will get a reservation by id and will be helpful in the checkin process. From the Reservations collection, we are going to return a reservation that matches the id in the url. To inject the url id to the parameter, we need to use the **@PathVariable** annotation.

```java
	@RequestMapping(value="/reservations/{id}", method = RequestMethod.GET)
	public Reservation findReservation(@PathVariable("id") int id) {
		return reservationRepository.findById(id).get();
	}
```

#### updateReservation

The updateReservation method is considered the checkin method, and here is where the client will provide the number of bags to checkin and where the _checkedIn_ flag will be flipped to true. To do this, we need to create an UpdateReservationRequest DTO class that takes the reservation id, checkIn flag, and number of bags.

```java
public class UpdateReservationRequest {
	private int id;
	private boolean checkIn;
	private int numberOfBags;
}
```

We then start with fetching the reservation entity using the id passed from the request objecty and update the numberOfBags and checkIn flag. Afterwards, we save the reservation object to the database using ReservationRepository.

```java
@RequestMapping(value = "/reservations", method = RequestMethod.PUT)
	public Reservation updateReservation(@RequestBody UpdateReservationRequest request) {
		Reservation reservation = reservationRepository.findById(request.getId()).get();
		reservation.setNumberOfBags(request.getNumberOfBags());
		reservation.setCheckedIn(request.isCheckIn());

		return reservationRepository.save(reservation);
	}
```

#### Configure Data Source

We configured the application.properties. Using this, we can now access our application using `localhost:8080/flightservices`

```
spring.datasource.url=jdbc:mysql://localhost:3306/reservation
spring.datasource.username=root
spring.datasource.password=1234
server.servlet.context-path=/flightservices
```

To populate the flight table, we used the following SQL

```sql
use reservation;

insert into flight values(1,'AA1','American Airlines','AUS',
'NYC',STR_TO_DATE('09-05-2022', '%m-%d-%Y'),'2022-09-05 03:14:07');

insert into flight values(2,'AA2','American Airlines','AUS',
'NYC',STR_TO_DATE('09-05-2022', '%m-%d-%Y'),'2022-09-05 05:14:07');

insert into flight values(3,'AA3','American Airlines','AUS',
'NYC',STR_TO_DATE('09-05-2022', '%m-%d-%Y'),'2022-09-05 06:14:07');

insert into flight values(4,'SW1','South West','AUS',
'NYC',STR_TO_DATE('09-05-2022', '%m-%d-%Y'),'2022-09-05 07:14:07');

insert into flight values(5,'UA1','United Airlines','NYC',
'DAL',STR_TO_DATE('09-05-2022', '%m-%d-%Y'),'2022-09-05 10:14:07');

insert into flight values(6,'UA1','United Airlines','NYC',
'DAL',STR_TO_DATE('09-05-2022', '%m-%d-%Y'),'2022-09-05 10:14:07');

insert into flight values(7,'SW1','South West','AUS',
'NYC',STR_TO_DATE('09-06-2022', '%m-%d-%Y'),'2022-09-06 07:14:07');

insert into flight values(8,'SW2','South West','AUS',
'NYC',STR_TO_DATE('09-06-2022', '%m-%d-%Y'),'2022-09-06 09:14:07');


insert into flight values(9,'SW3','South West','NYC',
'DAL',STR_TO_DATE('09-06-2022', '%m-%d-%Y'),'2022-09-06 10:14:07');

insert into flight values(10,'UA1','United Airlines','NYC',
'DAL',STR_TO_DATE('09-06-2022', '%m-%d-%Y'),'2022-09-06 10:14:07');
```

If we navigate to `http://localhost:8080/flightservices/flights`, we should get back the list of flights.

#### Filtering flights

As of now, the _findFlights_ method returns all flights. We can filter out the flights by implementing a repository method that will filter out the flights. We do so in FlightRepository and add the following method. Here we map the method to a JPQL query using hte **@Query** annotation. We map the parameters using the **@Param** annotation. The fields that are being used in the query comes from the fields of our Flight entity. Whenever the method is invoked, whatever data comes in to the parameters will be bound to the names in the @Param annotation to be used in the @Query.

```java
public interface FlightRepository extends JpaRepository<Flight, Integer> {
	@Query("from Flight where departureCity=:departureCity and arrivalCity=:arrivalCity and dateOfDeparture=:dateOfDeparture")
	List<Flight> findFlights(@Param("departureCity") String from,@Param("arrivalCity") String to, @Param("dateOfDeparture") Date departureDate);
}
```

Afterwards, we can modify the findFlights method in our Rest Controller. Instead of invoking findAll. we can invoke the findFlights method we created.

```java
	@RequestMapping(value = "/flights", method = RequestMethod.GET)
	public List<Flight> findFlights(@RequestParam("from") String from, @RequestParam("to") String to,
			@RequestParam("departureDate") @DateTimeFormat(pattern = "MM-dd-yyyy") Date departureDate) {
		return flightRepository.findFlights(from, to, departureDate);
//		return flightRepository.findAll();
	}
```

We can test out the filter by sending a post request.

```
localhost:8080/flightservices/flights?from=AUS&to=NYC&departureDate=09-05-2022
```

#### Testing the Save Find and Update Reservation

We can test the saveReservation and findReservation endpoints by sending the following via postman. This operation will create a row in both the reservation and passenger table.

```json
POST: localhost:8080/flightservices/reservations/

{
    "flightId": 1,
    "passengerFirstName": "Doge",
    "passengerLastName": "Doge",
    "passengerMiddleName": "Doge",
    "passengerEmail": "doge@doge.com",
    "passengerPhone": "12345"
}

GET: localhost:8080/flightservices/reservations/1
```

For the updateReservation endpoint, we can do a PUT request with the following. This sends back a 200 response along with the updated reservation object.

```json
PUT: localhost:8080/flightservices/reservations/

{
    "id": 1,
    "checkIn": true,
    "numberOfBags": 5
}
```

#### CORS

In order for our angular app to communicate with the REST endpoints, we need to turn on Cross Origin headers. We can do this by using hte **@CrossOrigin** annotation on our controller

```java
@RestController
@CrossOrigin
public class ReservationRestController {
```

## Flight Reservation Front End

This flightReservation application will be comprised of the find flights screen where the user can search for a flight. The user can then select a flight wherein they can enter their passenger and card details. Once the details are entered, a backend call will be made which will create a reservation in the database and display a confirmation screen. The four components are:

1. Find Flights
2. Display Flights
3. Passenger Details
4. Confirm Reservation

And we will be creating the reservationService which will be responsible for creating all the backend calls. The important concepts to be used in this use case are Routing, Forms and Data Binding.

After creating the project and generating the components and services, we start with creating the model classes for a search criteria and reservation

```typescript
export class Criteria {
  constructor(
    public from: string,
    public to: string,
    public departureDate: string
  ) {}
}

export class Reservation {
  constructor(
    public passengerFirstName: string,
    public passengerLastName: string,
    public passengerMiddleName: string,
    public passengerEmail: string,
    public passengerPhone: string,
    public cardNumber: string,
    public expirationDate: string,
    public securityCode: string,
    public flightId: string
  ) {}
}
```

Afterwards we proceed on writing the service layer. The reservation service will be responsible for fetching the flight information. Another backend call will be for fetching a single flitch details. The last call will be for saving a reservation.

```typescript
export class ReservationService {
  flightUrl: string = "http://localhost:8080/flightservices/flights";
  reservationUrl: string = "http://localhost:8080/flightservices/reservations";
  data: any;

  constructor(private _httpClient: HttpClient) {}

  public getFlights(criteria: Criteria): any {
    return this._httpClient.get(
      `${this.flightUrl}?from=${criteria.from}&to=${criteria.to}&departureDate=${criteria.departureDate}`
    );
  }

  public getFlight(id: number): any {
    return this._httpClient.get(`${this.flightUrl}/${id}`);
  }

  public saveReservation(reservation: Reservation): any {
    return this._httpClient.post(this.reservationUrl, reservation);
  }
}
```

Afterwards, we can configure routing. In the app-routing module, we can add the routes. For the PassengerDetails component route, we add a placeholder for the passenger's id so that we can retrieve the id into the component. The same is done for the confirm component.

```typescript
const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'findFlights',
    component: FindFlightsComponent,
  },
  {
    path: 'displayFlights',
    component: DisplayFlightsComponent,
  },
  {
    path: 'passengerDetails/:id',
    component: PassengerDetailsComponent,
  },
  {
    path: 'confirm/:id',
    component: ConfirmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
```

#### Find Flights Component

We then start implementing the Find Flights component. We start by defining the Criteria field. We then inject our ReservationService and Router to this component. The onSubmit method calls our service's getFlights() method wherein we pass a criteria and its response properties will be sent to the next component. We do this by putting the data into the ReservationService.

```typescript
export class FindFlightsComponent implements OnInit {
  criteria: Criteria = new Criteria("", "", "");

  constructor(private service: ReservationService, private router: Router) {}

  ngOnInit(): void {}

  public onSubmit() {
    this.service.getFlights(this.criteria).subscribe((res: any) => {
      this.service.data = res;
      console.log(res);
      this.router.navigate(["/displayFlights"]);
    });
  }
}
```

We can use the following html template:

```html
<html>
  <head>
    <title>Find Flights</title>
  </head>
  <body>
    <h2>Find Flights:</h2>
    <form #findFlightsForm="ngForm" (ngSubmit)="onSubmit()">
      From: <input type="text" [(ngModel)]="criteria.from" name="from" /> To:
      <input type="text" [(ngModel)]="criteria.to" name="to" /> Departure Date:
      <input
        type="text"
        [(ngModel)]="criteria.departureDate"
        name="departureDate"
      />
      <input type="submit" value="search" />
    </form>
  </body>
</html>
<router-outlet></router-outlet>
```

At this point, we can run the application. However, before doing so, we need to update the App Module to import HttpClientModule, FormsModule and add a provider to our ReservationService. We also changed the bootstrap component into FindFlightsComponent.

```typescript
@NgModule({
  declarations: [
    AppComponent,
    FindFlightsComponent,
    DisplayFlightsComponent,
    PassengerDetailsComponent,
    ConfirmComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ReservationService],
  bootstrap: [FindFlightsComponent],
})
```

#### Display Flights component

We can now proceed on displaying the flights that are fetched from the backend. Here the user can select a flight from a list. We define a _data_ field which we populate using the data we received from the previous section. The onSelect() method will take the id of the selected flight and pass it to the next view.

```typescript
export class DisplayFlightsComponent implements OnInit {
  data: any;
  constructor(private service: ReservationService, private router: Router) {}

  ngOnInit(): void {
    this.data = this.service.data;
  }

  public onSelect(id: number): any {
    this.router.navigate([`/passengerDetails/${id}`]);
  }
}
```

```html
<html>
  <head>
    <title>Flights</title>
  </head>
  <body>
    <h2>Flights:</h2>
    <table>
      <tr>
        <th>Airlines</th>
        <th>Departure City</th>
        <th>Arrival City</th>
        <th>Departure Date Time</th>
      </tr>
      <tr *ngFor="let flight of data">
        <td>{{ flight.operatingAirlines }}</td>
        <td>{{ flight.departureCity }}</td>
        <td>{{ flight.arrivalCity }}</td>
        <td>{{ flight.estimatedTimeOfDeparture }}</td>
        <td><a (click)="onSelect(flight.id)">Select</a></td>
      </tr>
    </table>
  </body>
</html>
```

#### Passenger Details Component

In the Passenger Details template, we display the flight details and passenger details. We will be using the flight id in the url from the previous section and use it to fetch the flight details. For the passenger details, we will be using a form and when submitted, the backend call will be made to save the reservation.

To retrieve the id from the url, we can use the **AcivatedRoute** component. We use the ngOnInit() method to make the backend call and fetch the backend details. We can use the ActivatedRoute's snapshot.params.id property.

We then proceed on implementing the onSubmit() method. We start with defining a field for the reservation object using our Reservation model. The reservation object will be filled in when the forms are filled because they are using 2 way binding with **ngModel**. When the saveReservation() method is called, it returns back a reservation id which we then navigate to.

```typescript
export class PassengerDetailsComponent implements OnInit {
  flightData: any;
  reservation: Reservation = new Reservation(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  );

  constructor(
    private service: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service
      .getFlight(Number.parseInt(this.route.snapshot.params.id))
      .subscribe((res: any) => {
        this.flightData = res;
      });
  }

  public onSubmit(): any {
    this.reservation.flightId = this.flightData.id;
    this.service.saveReservation(this.reservation).subscribe((res: any) => {
      this.router.navigate(["/confirm", res.id]);
    });
  }
}
```

```html
<html>
  <head>
    <title>Complete Reservation</title>
  </head>
  <body>
    <h2>Complete Reservation:</h2>
    <h2>Flight Details:</h2>
    Airline: {{ flightData?.operatingAirlines }}<br />
    Departure City: {{ flightData?.departureCity }}<br />
    Arrival City: {{ flightData?.arrivalCity }}<br />
    Departue Date : {{ flightData?.dateOfDeparture }}<br />

    <h2>Passenger Details:</h2>
    <form #passengerForm="ngForm" (ngSubmit)="onSubmit()">
      <pre>
        First Name:<input type="text" name="passengerFirstName" [(ngModel)]="reservation.passengerFirstName"/>
        Last Name:<input type="text" name="passengerLastName" [(ngModel)]="reservation.passengerLastName"/>

        Middle Name:<input type="text" name="passengerMiddleName" [(ngModel)]="reservation.passengerMiddleName"/>

        Email:<input type="text" name="passengerEmail" [(ngModel)]="reservation.passengerEmail"/>
        Phone:<input type="text" name="passengerPhone" [(ngModel)]="reservation.passengerPhone"/>
        Card Number:<input type="text" name="cardNumber" [(ngModel)]="reservation.cardNumber"/>
        Expiry Date:<input type="text" name="expirationDate" [(ngModel)]="reservation.cardNumber"/>
        Security Code:<input type="text" name="securityCode" [(ngModel)]="reservation.securityCode"/>
        <input type="submit" value="confirm"/>
      </pre>
    </form>
  </body>
</html>
```

#### Confirmation Component

To display the reservation id, we can use ActivatedRoute once again.

```typescript
export class ConfirmComponent implements OnInit {
  reservationId: number = 0;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reservationId = Number.parseInt(this.route.snapshot.params.id);
  }
}
```

```html
<b>
  Your Flight reservation is complete.The confirmation code is: {{ reservationId
  }}
</b>
```

## Flight Check Front End

For this section, we will be working with the flightCheckIn project. This application will contain a component asking for a reservation id. Once the user enters, a backend call will be made to fetch the reservation details with the given id. The reservation details and passenger details will then be given and will ask the user how many bags to check in. Once the user checks in, the reservation object will be updated with the number of bags, and the checkedIn flag will be flipped to true. The components for this project will be

1. Start Check In
2. Check In
3. Confirm Check In

There will be one service that will be making backend calls for fetching a reservation and updating the reservation. The method checkIn() will receive a checkInRequest object which will contain the check in details and number of bags.

```typescript
export class CheckinService {
  reservationUrl: string = "http://localhost:8080/flightservices/reservations/";
  reservationData: any;
  constructor(private _httpClient: HttpClient) {}

  public getReservation(id: number): any {
    return this._httpClient.get(`${this.reservationUrl}/${id}`);
  }

  public checkIn(checkInRequest: any): any {
    return this._httpClient.put(this.reservationUrl, checkInRequest);
  }
}
```

Afterwards, we set up the routes.

```typescript
const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'startCheckIn',
    component: StartcheckinComponent,
  },
  {
    path: 'checkIn',
    component: CheckinComponent,
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
```

We can then proceed on implementing the components. We start with the CheckIn component. We create the onClick() method which is mapped to a click event. This method will call the getReservation service and pass into it the reservationId from the input form. We update the reservationData field of our service with the response object.

```typescript
export class StartcheckinComponent implements OnInit {
  reservationId!: number;
  constructor(private service: CheckinService, private router: Router) {}

  ngOnInit(): void {}

  public onClick() {
    this.service.getReservation(this.reservationId).subscribe((res: any) => {
      this.service.reservationData = res;
      this.router.navigate(["/checkIn"]);
    });
  }
}
```

```html
<h1>Flight CheckIn</h1>
<button routerLink="/startCheckIn">Start</button>
<router-outlet></router-outlet>
```

```html
<h1>Enter the reservation id</h1>
<input type="text" [(ngModel)]="reservationId" /><br />
<button (click)="onClick()">Next</button>
```

To bootstrap the application, we will need to update our app module to include the imports and provide services.

```typescript
@NgModule({
  declarations: [
    AppComponent,
    StartcheckinComponent,
    CheckinComponent,
    ConfirmComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CheckinService],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Afterwards, we can work on the checkin component. This is where the user can review the reservation information, enter the number of bags and check in. The _data_ field and _noOfBags_ are the expected fields for the component. In the ngOnInit(), we need to assign the data which we retrieve from the service.

```typescript
export class CheckinComponent implements OnInit {
  noOfbags!: Number;
  data: any;

  constructor(private service: CheckinService, private router: Router) {}

  ngOnInit(): void {
    this.data = this.service.reservationData;
  }

  public checkIn() {
    let request = {
      id: this.data.id,
      checkIn: true,
      numberOfBags: this.noOfbags,
    };
    this.service.checkIn(request).subscribe((res: any) => {
      this.router.navigate(["/confirm"]);
    });
  }
}
```

```html
<h1>Review Details</h1>
<h2>Flight Details:</h2>
Airlines: {{ data?.flight?.operatingAirlines }}<br />
Flight No: {{ data?.flight?.flightNumber }}<br />
Departure City: {{ data?.flight?.departureCity }}<br />
Arrival City: {{ data?.flight?.arrivalCity }}<br />
Date Of Departure: {{ data?.flight?.dateOfDeparture }}<br />
Estimated Departure Time: {{ data?.flight?.estimatedDepartureTime }}<br />
<h2>Passenger Details:</h2>

First Name: {{ data?.passenger?.firstName }}<br />
Last Name: {{ data?.passenger?.lastName }}<br />
Email : {{ data?.passenger?.email }}<br />
Phone: {{ data?.passenger?.phone }}<br />
Enter the number of bags to check in:<input
  type="text"
  [(ngModel)]="noOfbags"
/>
<button (click)="checkIn()">CheckIn</button>
```
