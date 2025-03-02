# React Router
This Repository Contains information all about React Router 

## List of Concepts

1. [React Routing](#1-react-routing)
2. [Link Tag](#2-link-tag)  
3. [NavLink Tag](#3-navlink-tag)
4. [UseNavigate Hook](#4-usenavigate-hook)  
5. [Nested Routes](#5-nested-routes) 
6. [Custom 404 Page](#6-custom-404-page) 
7. [React Router Loader](#7-react-router-loader)  
8. [Route Parameters and Dynamic Routing](#8-route-parameters-and-dynamic-routing)  
9. [React Router Error Element](#9-react-router-error-element)

## 1. React Routing

- npm install react-router-dom
- Setup the Basics before Routing like keep ready the Pages to be routed to.
- main.jsx → Import BrowserRouter from ‘react-router-dom’; and wrap the app.jsx into it.
    
    ```jsx
    import { BrowserRouter } from 'react-router-dom'
    
    createRoot(document.getElementById('root')).render(
      <BrowserRouter >
        <App />
      </BrowserRouter>
    )
    ```
    

- App.jsx → Wrap the Routes into the <Routes> and add each particular Route using <Route>
    
    ```jsx
    import React from 'react'
    import Navbar from './components/Navbar'
    import Home from './pages/Home'
    import Products from './pages/Products'
    import About from './pages/About'
    import Contact from './pages/Contact'
    import { Routes, Route } from 'react-router-dom' // 2
    
    const App = () => {
      return (
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      )
    }
    ```
    

- Added some styling for better look.

## 2. Link Tag

- Import and wrap the pages inside the Link
    
    ```jsx
    import React from 'react'
    import logo from '../assets/logo.png'
    import { Link } from "react-router-dom"
    
    const Navbar = () => {
        return (
            <div className='navbar'>
                <img src={logo} alt="" width="160px" />
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/products"><li>Products</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/contact"><li>Contact</li></Link>
                </ul>
                <button>Get Started</button>
            </div>
        )
    }
    
    export default Navbar;
    ```
    

- Now we will learn new method of React Routing using Router Provider
    1. Create a layout folder with file RootLayout.jsx. Inside this we will put Navbar so that it stays in all the pages. We use something called as Outlet here.
       - The **`<Outlet>`** component in React Router is a placeholder within a parent route's component that indicates where child routes should be rendered. It acts as a dynamic container that changes its content based on the current URL, allowing for efficient nested routing.
        
        ```jsx
        import React from 'react'
        import Navbar from '../components/Navbar'
        import { Outlet } from 'react-router-dom'
        
        const RootLayout = () => {
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
            )
        }
        
        export default RootLayout
        ```
        

    2. Using createBrowserRouter we create a Router using createRoutesFromElements inside it with one Parent Route and then Child Routes inside it. 
    3. Then inside the return statement we can just use <RouteProvider /> and pass the router we just created.
    4. We need to import the RootLayout file path and then pass it inside the element of Parent Route.
    
        ```jsx
        import React from 'react'
        import Navbar from './components/Navbar'
        import Home from './pages/Home'
        import Products from './pages/Products'
        import About from './pages/About'
        import Contact from './pages/Contact'
        import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom' // 2
        import RootLayout from './layout/RootLayout' // 3
        
        const App = () => {
        
        const router = createBrowserRouter(
            createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path='products' element={<Products />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
            </Route>
            )
        ); // 3
        
        return (
            <RouterProvider router={router} />
        )
        }
        
        export default App;
        ```
    

## 3. NavLink Tag

- Import and Replace the Link tag with NavLink Tags in Navbar.
- No matter if we use Link or NavLink Tag they will be converted to anchor tags later (Check by Inspecting the Page).
    
    ![image.png](./src/assets/NavLink%20Tag%20Inspection.png)
    

- The difference **Link** and **NavLink** Tag is just this: When we use NavLink we get an extra class called “active” which gets added in the anchor tag when we navigate between the pages. Whichever Page we are on currently gets this active state. Based on this active class we can style the link color or something to show this is the active current page we are present on kind of thing.

## 4. UseNavigate Hook

- `useNavigate` allows us to redirect users to different routes without requiring user interaction.
- When to use this ?
    - **Programmatic Navigation:** Based on certain events or conditions, such as after submitting a form, fetching data or checking user authentication status.
    - **Non-Interactive Navigation:** Such as redirecting users after a successful login or when a certain condition is met.

- Import it and use it on the button for now so that we are redirected to about page when we click on it. Pass “`./about`" as parameter in the navigate function when called onClick function of the button
    
    ```jsx
    import React from 'react'
    import logo from '../assets/logo.png'
    // import { Link } from "react-router-dom"
    import { NavLink, useNavigate } from "react-router-dom"
    
    const Navbar = () => {
    
        const navigate = useNavigate();
    
        return (
            <div className='navbar'>
                <img src={logo} alt="" width="160px" />
                <ul>
                    <NavLink to="/"><li>Home</li></NavLink>
                    <NavLink to="/products"><li>Products</li></NavLink>
                    <NavLink to="/about"><li>About</li></NavLink>
                    <NavLink to="/contact"><li>Contact</li></NavLink>
                </ul>
                <button onClick={() => navigate('/about')}>Get Started</button>
            </div>
        )
    }
    ```
    

- Now if I want
    - After login the user should not be able to go back or On Form submission the user should not be able to go back else resubmission may occur kind of thing then I need to pass second parameter to navigate.
        
        ```jsx
        <button onClick={() => navigate('/about', {replace: true})}>Get Started</button>
        ```
        

        ![image.png](./src/assets/History%20Store.png)

## 5. Nested Routes

- Nested routes in React Router allow you to create hierarchical navigation structures where child routes are rendered within their parent routes.
  
- Here we are creating the two buttons clicking which I need to get routed to child routes of the contact page.
  
- Two Child Routes are `contact/info` and `contact/form`.
    1. Create two Child components in the Components folder.
    2. Create a `ContactLayout` inside the Layout folder.
    3. Import Contact and Outlet inside the ContactLayout and use them.
    4. In the Contact component add two buttons and use UseNavigate.
        
        ```jsx
        import { useNavigate } from 'react-router-dom'
        ...
        const navigate = useNavigate();
        ...
        <div className='contact-buttons'>
            <button onClick={() => navigate('info')}>Contact Info</button>
            <button onClick={() => navigate('form')}>Contact Form</button>
        </div>
        ```
        
    5. In the App.jsx add the Child Routes under the Parent Route.
        
        ```jsx
        <Route path='contact' element={<ContactLayout />}>
            <Route path='info' element={<ContactInfo />} />
            <Route path='form' element={<ContactForm />} />
        </Route>
        ```
        

## 6. Custom 404 Page

- To provide a good experience to the users. When a user visits a page that does not exists we need to provide them with 404 Custom page.
- Steps:
    1. Create a 404 NotFound Component.
    2. Add the Route with the NotFound Component and render it in the Routes at last in App.jsx
        
        ```jsx
        <Route>
        		...
        		<Route path='*' element={<NotFound />} />
        </Route>
        ```
        

## 7. React Router Loader

- React Router Loader is a feature in React Router that allows you to fetch data for a route before it is rendered. This is achieved by defining a **`loader`** function for each route, which runs before the route's component is rendered. The loader function can fetch data from APIs, databases, or other sources and makes this data available to the component using the **`useLoaderData`** hook.

- **Comparison with `useEffect`**
    
    Loaders and **`useEffect`** both handle data fetching, but they serve different purposes:
    
    - **Loaders**: Fetch data before rendering the component, ensuring data is available when the component mounts.
  
    - **`useEffect`**: Fetches data after the component has been rendered, often used for handling side effects or updating data after initial render

> To Start the server:
npx json-server —watch data.json —port 5000
> 

- Steps
    1. Created a new page + Layout for displaying Jobs. Created a Sample data.json file with few Jobs data.
        
        ```json
        {
            "jobs": [
                {
                    "id": 1,
                    "title": "Sr. React Developer",
                    "salary": 50000,
                    "location": "London UK",
                    "description": "We are looking for a talented and experienced Sr. React Developer to join our dynamic team in London, UK. In this role, you will be responsible for building and maintaining high-quality, responsive web applications using React.js. You will collaborate with cross-functional teams to deliver innovative solutions and contribute to the overall success of our projects"
                },
                {
                    "id": 2,
                    "title": "Frontend Developer",
                    "salary": 40000,
                    "location": "San Francisco US",
                    "description": "We are seeking a skilled Frontend Developer to join our team in San Francisco. The ideal candidate will have experience in building responsive and user-friendly web applications using HTML, CSS, and JavaScript frameworks like React or Vue.js. You will collaborate closely with designers and backend developers to deliver high-quality products. If you are passionate about creating seamless user experiences, we’d love to hear from you!"
                },
                {
                    "id": 3,
                    "title": "Full Stack Developer",
                    "salary": 60000,
                    "location": "Bangalore IN",
                    "description": "We are looking for a talented Full Stack Developer to join our team in Bangalore. You will be responsible for developing and maintaining web applications using frontend technologies like React and backend frameworks like Node.js. The ideal candidate should have experience with databases, RESTful APIs, and full-cycle application development. Join us to work on exciting projects and advance your career!"
                },
                {
                    "id": 4,
                    "title": "Product Manager",
                    "salary": 90000,
                    "location": "Los Angeles US",
                    "description": "We are seeking an experienced Product Manager to lead product strategy and execution in Los Angeles. You will work closely with cross-functional teams to define product vision, drive development, and ensure successful delivery. The ideal candidate should have strong leadership skills, a strategic mindset, and a proven track record in product lifecycle management. Join us to shape innovative products and make a real impact!"
                },
                {
                    "id": 5,
                    "title": "UI Developer",
                    "salary": 40000,
                    "location": "Mumbai IN",
                    "description": "We are looking for a creative and detail-oriented UI Developer to join our team in Mumbai. You will be responsible for designing and implementing user interfaces that provide an exceptional user experience. The ideal candidate should have strong skills in HTML, CSS, JavaScript, and experience with design tools and UI frameworks. If you are passionate about creating visually appealing and user-friendly interfaces, we'd love to meet you!"
                }
            ]
        }
        ```
        
    2. In Jobs Page we will use the loader and display the data.
        
        ```jsx
        import React from 'react'
        import { Link, useLoaderData } from 'react-router-dom';
        
        const Jobs = () => {
            const jobsData = useLoaderData();
            return (
                <div className='jobs'>
                    {jobsData.map((job) => {
                        return <Link>
                            <h3>{job.title}</h3>
                            <p>{job.location}</p>
                        </Link>
                    })}
                </div>
            )
        }
        
        export default Jobs;
        
        // Adding loader function here
        
        export const jobsLoader = async () => {
            const response = await fetch("http://localhost:5000/jobs");
            return response.json();
        }
        ```
        

    3. In JobsLayout we will use this Jobs Component.
    
        ```jsx
        import React from 'react'
        import { Outlet } from 'react-router-dom';
        
        const JobsLayout = () => {
            return (
                <div>
                    <h2>Job Openings</h2>
                    <p>List of current job opening in our company.</p>
                    <Outlet />
                </div>
            )
        }
        
        export default JobsLayout;
       ```

   4. In App.jsx we will just use this new Route for Jobs and in the Route we need to mention this loader function for sure.
      ```jsx
              <Route path='jobs' element={<JobsLayout />}>
                  <Route index element={<Jobs />} loader={jobsLoader} />
              </Route>
      ```
        
    

## 8. Route Parameters and Dynamic Routing

- Route parameters and dynamic routing in React Router are powerful features that allow you to create flexible and reusable routes.
  
- Route Parameters: are parts of a URL that are dynamic and can change based on the context. They are defined using a colon (**`:`**) followed by the parameter name in the route path. For example, a route like **`/users/:userId`** captures the **`userId`** as a parameter from the URL.
  
- Dynamic Routing:  involves creating routes that can handle different data or scenarios without needing a separate route for each case. This is achieved by using route parameters or other dynamic routing techniques.
  
- Steps:
    1. Created one more component called JobDetails.jsx with basic template and added its Route inside the App.jsx under the jobs parent Route.
        
        ```jsx
        <Route path='jobs' element={<JobsLayout />}>
        		<Route index element={<Jobs />} loader={jobsLoader} />
        		<Route path=':id' element={<JobDetails />} />
        </Route>
        ```
        

    2. In the JobDetails component we made use of Loader function to pre-load the jobdetails using the params and then displayed it in the component div.
       - I added a button for going back to Jobs page from the jobdetails page using navigate(-1).
    
            ```jsx
            import React from 'react'
            import { useLoaderData, useNavigate } from 'react-router-dom';
            // import { useParams } from 'react-router-dom'
            
            const JobDetails = () => {
            
                // Getting dynamic value id from the URL using the useParams hook
                // const { id } = useParams();
            
                const jobDetails = useLoaderData();
                const navigate = useNavigate();
            
                return (
                    <div className='job-details'>
                        <p><b>Job Title: </b>{jobDetails.title}</p>
                        <p><b>Salary: </b>{jobDetails.salary}</p>
                        <p><b>Job Location: </b>{jobDetails.location}</p>
                        <p><b>Description: </b>{jobDetails.description}</p>
                        <button>Apply Now</button>
                        <br />
                        <button onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                )
            }
            
            export default JobDetails;
            
            export const JobDetailsLoader = async ({ params }) => {
                const { id } = params;
            
                const response = await fetch("http://localhost:5000/jobs/" + id);
                return response.json();
            }
            ```
    

    3. In the Jobs component made little change. When the jobs are clicked they are made to open with all the details. In the Link tag just add the `to={job.id.toString()}` and key.
   
    4. In the App.jsx add the Route with Dynamic Route `:id` Parameter and the Loader.
        
        ```jsx
        <Route path='jobs' element={<JobsLayout />}>
                <Route index element={<Jobs />} loader={jobsLoader} />
                <Route path=':id' element={<JobDetails />} loader={JobDetailsLoader} />
        </Route>
        ```
    

## 9. React Router Error Element

- In React Router, the **`errorElement`** is a feature that allows you to handle errors that occur during the rendering of a route or when using loaders and actions. It provides a way to display a custom error UI instead of the default error page, which is not intended for end-user consumption.
  
- For example: if the user tries to fetch some job details which does not exist with that job id then we can show custom error message.
  
- Steps:
    1. Create an Custom Error Component. We use `useRouterError` hook here.
        
        ```jsx
        import React from 'react'
        import { useNavigate, useRouteError } from 'react-router-dom'
        
        const Error = () => {
        
            const error = useRouteError();
            const navigate = useNavigate();
        
            return (
                <div className='job-details'>
                    <h3>An Error Occurred.</h3>
                    <p>{error.message}</p>
                    <button onClick={() => navigate("/")}>Go to homepage</button>
                </div>
            )
        }
        
        export default Error;
        ```
        

    2. In the Jobs Page and JobDetails component we need to add the check inside the loader function using the Response object.
    
        ```jsx
        // Jobs.jsx
        export const jobsLoader = async () => {
            const response = await fetch("http://localhost:5000/jobs");
                // Adding check for the errorElement using thing "ok" property from response object
            if (!response.ok) {
                throw Error("Could not find the job list!");
            }
        
            return response.json();
        }
        
        // JobDetails.jsx
        export const JobDetailsLoader = async ({ params }) => {
            const { id } = params;
        
            const response = await fetch("http://localhost:5000/jobs/" + id);
            // Adding check for the errorElement using thing "ok" property from response object
            if (!response.ok) {
                throw Error("Could not find the job details!");
            }
        
            return response.json();
        }
        ```
    

    3. In the App.jsx we need to add the Error Component to the desired Route using `errorElement={<Error />}`
