# redux Toolkit  - UTILITY framework
- Documentation is there here u get a easy example....
- use of redux -- so we use a library name react for building UI 
- and if we r building UI then we have to manage state/data - (stateManagement) now what is state stateManagement in short 
let suppose u have a variable A and u want on click on a button u want to update the value of A so this is done by stateManagement
so to manage state effectively rather then treditional reaxt stateManagement we use redux 

## STEP 1 create a react app 
-- make a react folder 
-- now clean app and index.css

# if progressively u grom your app in react managing data | props drilling becomes difficult 
## App -----> parent -------> child -------> GrandChild {issue -- } chaininig

now  what if i directly want to send data from [parent] to [child] (yes, for this we had contextAPI but before the we had only props drilling) so with PROPSDRILLING it was not possible.

## for proper stateManagement we had redux (NOW there is a twist context API was not there before redux----2015) -- making data centralized redux keeps the data in central store (SINGLE SOURSE OF TRUTH)

## NOW initailly redux had very bad syntax - complex code - to many boilerplateCode 

## -- improved version is redux --------> redux 2.0 (redux toolkit)

## WHY REDUX when we have CONTEXT API  (context api is good for small application)
- but in larger application
- different context (theme, auth ,task,....) managing all Context
- EX - a colony - > one shop rice -second shop -> wheat -> third shop water(different store) CONTEXTAPI
- EX - a colony a superstore -->section --> grosary --> drink ---> vegetable


# STEP 2 go to redux toolkit official page
- try to read Documentation
- now install redux using 
- npm install @reduxjs/toolkit react-redux
- understand architecture of redux form excalidraw
- now code implemenation 

-- in react folder 
--  first we craete a store 
--  folder (redux) -- file -- store.js
--  configer store
## slices
--  create slices - portion of state userslice cardslice themeslice
## Reducers
-- are the function that will update the state
## action 
an object describing what happned 
## dispatch 
--  function that send the action to store
## selector
-- function that is user to read data from store 
-- configure redux 
-- wrap provider main.jsx
-- inside store we make reducers bu for now firs lets make slices
-- no we make slices