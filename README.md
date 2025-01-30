

Setup Documentation & Features implemented
==========================================



### Docker
- Run the `docker-compose up` everything gets setup.

--------------------------------------------------------------------------------------------------------------------------------------------

### Database
- Do `docker-compose up` in the terminal where you see `docker-compose.yml`
- You should see the postgres container running
- Postgres URL - `postgresql+psycopg2://postgres:root@postgres:5432/price_ops`
- If you are running backend without docker then postgres url - `postgresql+psycopg2://postgres:root@localhost:5432/price_ops`
  - Set this to the environment URL
- Most of the queries happened with product_id and owner_id
  - I used UUID for the creation of product_id and owner_id
- Indexes are created on name and category of the product 
  - Helpful if the database goes big.
- Unique constraint created with the (product name and owner id)
  - Reason is to help the search retrieve faster as the combination is unique
  - Removes unwanted duplicates


--------------------------------------------------------------------------------------------------------------------------------------------


### Backend
#### Without Docker
- Open terminal inside `backend` folder
- Run `python3 -m venv .venv`
- Run `source .venv/bin/activate`
- Run `pip3 install -r requirements.txt`
- Provide the environment variables especially the database url as per the above.
- If that is successful
  - Run `python3 main.py`
- You should see server starting and providing this url. `http://127.0.0.1:7777`
- Test the api `http://127.0.0.1:7777/ping` provides this output `"<h3>You are connected to Price Optimising tool</h3>"`

#### With Docker
- Do `docker-compose up` in the terminal where you see `docker-compose.yml`
- Test the api `http://127.0.0.1:7777/ping` provides this output `"<h3>You are connected to Price Optimising tool</h3>"`


#### Note
1. All the tables and related constraints get installed at the start of ther server.


--------------------------------------------------------------------------------------------------------------------------------------------


### Frontend
#### Without Docker
- Open terminal insider `frontend` folder
- Run `npm install`
- If that is successful
  - Run `npm start`
- In `src/constants.js` please provide the backend url if your backend url is running in different than `http://127.0.0.1:7777`
- Navigate to `http://localhost:3000/` in any of the browser. 
  - You should see the `login`
- Register yourself by clicking on `Register` and then `login`

#### With Docker
- Inside `frontend` folder
  -  In `src/constants.js` please provide the backend url if your backend url is running in different than `http://127.0.0.1:7777`
- Do `docker-compose up` in the terminal where you see `docker-compose.yml`
- Navigate to `http://localhost:3000/` in any of the browser. 
  - You should see the `login`
- Register yourself by clicking on `Register` and then `login`

#### Next Steps
- Add Product (kindly add multiple with different categories and same categories)
- You should see list of products
  - A product can be `deleted`, `updated` and `viewed`
  - Update product - Prepopulated data, option to update it. (The update happens based on the product_id)
  - Delete product - The delete happens based on the product_id, Did not get enough time to implement the confirmation.
  - View Product - The product is viewed but can't change them and save them 
- If you have sufficient products, you can do 
  - Demand Forecast
  - Filter out based on categories
  - Search with the key string
- Another tab 
- Login creates 3 cookies
  - `is_user_authenticated` - true or false
  - `user_role` - role of the user
  - `access_token` - Tried httpOnly cookie but could not debug the issue as i was running out of time.
  - Once you click on log out these are deleted.


--------------------------------------------------------------------------------------------------------------------------------------------


### Features Implemented
1. Implement user registration and login functionality with email verification. - Role-based access control with different permissions for admin, buyer, and supplier roles.
2. Used Python (FastAPI) for backend development, with a focus on scalability and security.
3. Used modern JavaScript frameworks React.js for the frontend, with a responsive and intuitive design.
4. Utilized a relational database PostgreSQL
5. Implement database indexing for improved search performance.
   1. Automated the process of creation of tables and constraints at the start of the backend server. 
6. Ability to create, view, update, and delete products is implemented.
7. Products displayed in UI include details such as name, category, cost price, selling price, description, stock available and units sold till date.
8. Implemented advanced search functionality to find products based on multiple criteria (name & category).
9. Added filters to sort products by attributes like category.
10. The user should be able to show demand forecast for the product. 
    1.  Note - the demand forecast represented in the sample screenhshot showed use of time series data. 
        1.  I don't have any time series data. So, i implemented D3.js with a sample graph
        2.  Users can  see the forecasted demand of different products on a linear plot (demand vs selling price) based on the output.
11. The data should be shown in a tabular form having the product details along with optimized prices.
    1.  This is displayed as a separate tab. 
12. The data displayed is based on admin, buyer and supplier role and owner of the products
    1.  Admin can see all the products present
    2.  Buyer or seller can see their own added products.
    3.  More information regarding this is not available.

### Missed implementations
1. Page to request for the custom roles / update of their current role / Admin has to accept the role.

