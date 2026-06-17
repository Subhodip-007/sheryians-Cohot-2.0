import React from 'react'

const App = () => {
    function btnclk() {
        console.log("clicked");

    }
    return (
        <div>
            <h1>heloo subhodip</h1>
            <button onClick={btnclk}>change</button>
            <button onClick={function btnclk() {
                console.log("clicked");

            }}>explore</button>

            <input onChange={(e)=> e.target.value } type="text" placeholder='enter name' />
        </div>
    )
}

export default App