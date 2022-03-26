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
