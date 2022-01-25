## A Learning Full Stack Challenge

Assume the customers around a campus order 5000 orders a day from 50 local restaurants. Each order contains one or multiple products. For eg, `2 burritos, a soda, and a side of chips`.

1. Design a full stack application which returns an infinite-scrolling list of trending products to the user.
2. A product can be qualified as trending if it is purchased at least once in last 48 hours
3. Each product should be displayed with two tags:
    * a recent purchase tag: `5 purchased recently`
    * a time tag `ordered 3 min ago`
4. **Use a heuristic to determine which trending products gets returned higher. Base heuristic on both recency and number of recent purchases.**

## Requirements

1. Implement a Full-Stack solution including web server, backend persistence and associated code.
2. Please submit with in 72 hours from the time you accept invitation. (If circumstances don't allow for this, please let us know early!)
3. You can use pseudocode for parts of web application. For instance, you could replace a function body with "assume this service has the following API."

## Practices

### Quality of code 

Please use best practices for writing code and publish to this repo. 

### Q & A

- Please create an issue and tag `@shrimuthu`, `@aduca98`, `@nprbst` and `@seankwalker` for any questions.
- **When you are ready to submit, please create an issue and tag `@BiancaVGreen`, `@shrimuthu`, and `@nprbst`.**

### Data

For sample data, you may use [Sample Orders](https://docs.google.com/spreadsheets/d/1xfAjSlBflehOYj4O7I2YkfcBB1b9VgSHg9X-SmRWmsE/edit#gid=280279953), or generate your own.

> Note: Remember to insert your own random timestamps to fit within 48 hours window.
 
## Solution

I've built a MERN stack app that follows the below structure: 


**Database**: Mongodb ---> **Server**: (Node.js, Express.js) ---> **Web**: React.js

**Designing the database:** 

Key assumption here is that when querying data from server, we assume that the data entries in the database is fixed. That is, we do not capture the dynamic nature of data as streams feeding into our database. Why is that? Assume we do capture the database changing, then our React app will: 1. have items with constantly changing fields (such as latest purchase time would change). 2. have items shifting due to the time difference during scrolling down page; thus, our sorting heuristic is arbitrary in the sense that it always might change before the client even had the time to read through the entire list. Therefore, in the construction of this app, we assume we only want a snapshot of the data in our database at the time when client calls from the client-app.

**Randomizing order time:**

The order time should be same for all items in the data who share the same order id. Since the provided sample data has no timestamp entry, and assuming that in real practice, such data exits, I populated the sample data in excel by running the following lines -

```
=TEXT(RAND()*("2021-11-1 12:00:00"-"2021-10-28 9:00")+"2021-10-28 9:00:00","YYYY-MM-DDTHH:MM:SSZ") 
=IF(A2=A3,G2, TEXT(RAND()*("2021-11-1 12:00:00"-"2021-10-28 9:00")+"2021-10-28 9:00:00","YYYY-MM-DDTHH:MM:SSZ"))
```

Notice, I assume that the timestamp in real practice is stored as an ISO date-time string.

**Server Query:** 

Only need one server api route to satisfy the requirement from our client-app. Given a date object representing the timestamp when the user requests from the client-app, I query data entries from our Mongodb database while applying a filter, filtering out entries if the string representation ISO date-time object for its timestamp is smaller than string representation ISO date-time object of the timestamp 48 hours from now. Note, that we can directly compare the ISO strings if there is not timezone offsets. 

Then, from the entries that are less than 48 hours old, we can transform these data into the data type that our client wants, which is an object with three fields: 1. item name 2. # of recent orders. 3. x mins ago the most recent order was made. We do that by initializing an object - clientList - with keys as item names and values as an object with the above fields. Then, we iterate through the list of object queries before once, storing all relevant data for our new client object. 

Lastly, we sort the clientList by the most recent order by the hours from now. If two orders are in the same hour, then we sort by # of recent items. Note, we assume an order is recent if it is ordered less than 48 hours ago. We return the result to the client-app. 

**Client-app and React:** 

We build out our simple infinite scrolling app by using Boostrap and infinite-scrolling-component library in React.js (in the OrderList.js file). The infinite-scrolling-component needs to know if there are more data to be rendered and what are those data. These states are captured by hasMore and fetchMoreData. Since, we can reasonably assume the data fetched from our server is not large, then we store all that in our client-app. Some bootstrap components/ functionalities are used to make our app minimally pretty.
## Setting up Environment: 

- Make sure to install latest versions of:
    - npm
    - Mongodb
    - React.js
    - axios
    - bootstrap
    - Express.js
    - Mongoose
    - [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component)
    

## Setting up Mongodb: 

Database stored locally via Mongodb 

- Instantiate a local Mongodb database and name it **topOrders**
- Navigate to root of project folder /**top_orders**
- Import CSV data **sample_orders.csv** into **topOrders** by running the following command in Terminal
    
    ```
    mongoimport --type csv -d topOrders -c sample_orders --headerline --drop sample_orders.csv
    ```
    

## Installation and Run 

Build and serve locally using Node.js

- Navigate to the root of the /**backend** folder in Terminal and run the following command
    
    ```
    npm start
    ```
    
- Navigate to the **root** of /**client-app** folder in Terminal and run the following command
    
    ```
    npm start 
    ```
    
    This command runs the React App at: **http://localhost:3000**
