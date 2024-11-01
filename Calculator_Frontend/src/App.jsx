import Cal from './assets/Components/Cal';
import Operation from './assets/Components/Operation';
import catGif from './assets/images/cat.gif';
import axios from 'axios';
import { useState } from 'react';
function App() {
    const [result, setRes] = useState("");
    let there_dot = false;
    

    function deleteAll() {
        setRes("");
        there_dot = false;
    }

    function deleteLastChar() {
        setRes((r) => r.slice(0, -1));
    }

    function toggle() {
        setRes((r) => (r.startsWith("-") ? r.slice(1) : `-${r}`));
    }

   
    function updateResult(symbol) {
        if ("+-x÷".includes(symbol) && result.length === 0) {
            setRes("0" + symbol);
            if (symbol === ".") {
                there_dot = true;
            }
            return;
        }
        
        if (symbol === ".") {
            // Find the last operator (+, -, x, ÷)
            const lastOperatorIndex = Math.max(
                result.lastIndexOf("+"),
                result.lastIndexOf("-"),
                result.lastIndexOf("x"),
                result.lastIndexOf("÷")
            );
    
            // Check if there's a dot after the last operator
            const segmentAfterLastOperator = result.slice(lastOperatorIndex + 1);
            if (segmentAfterLastOperator.includes(".")) {
                return; // Do nothing if a dot already exists in the segment
            }
    
            setRes((r) => r + symbol); 
            there_dot = true;
            return;
        }
    
     
        if ("+-x÷".includes(symbol) && "+-x÷".includes(result[result.length - 1])) {
            deleteLastChar(); // Replace the last operator with the new one
        }
    
        setRes((r) => r + symbol);
    }
    

    function square() {
        if (result.length > 0) {
            setRes((r) => `${r}²`);
        }
    }

    function square_root() {
        setRes((r) => `${r}√`);
    }

    function reciprocal() {
        if (result.length > 0) {
            setRes((r) => `${r}⁻¹`);
        }
    }

    function pressEqual() {
        const formattedExpression = result
            .replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/²/g, '^2')
            .replace(/⁻¹/g, '^-1')
            .replace(/%/g, '/100')
            .replace(/([0-9])√/g, '$1 * sqrt')  // Fixes issues like "5Math.sqrt5"
            .replace(/√([0-9]+)/g, 'sqrt($1)')// Fixes Math.sqrt25 to Math.sqrt(25)
            ;

            console.log(formattedExpression);
            axios.post('http://localhost:8080/api/calculate', { expression: formattedExpression })
            .then(response => {
                console.log(response.data);
                setRes(response.data);
            })
            .catch(error => {
                setRes("Error");
                console.error("There was an error calculating:", error.response.data);
            });
    }
    

    return (
        <>
            <div className="animated-cat">
                <img src={catGif} alt="Animated Cat" />
            </div>
            <div className='App'>
                <div id='Res'>
                    <Cal value={result} />
                </div>
                <div className="RowButton flex">
                    <Operation className={"fas fa-percentage"} onClick={() => updateResult("%")} />
                    <Operation name="(" onClick={() => updateResult("(")} />
                    <Operation name=")" onClick={() => updateResult(")")} />
                    <Operation name="CE" onClick={deleteAll} id='cancel' />
                    <Operation id='cancel' name="C" onClick={deleteAll} />
                    <Operation id='delete' className={"fa-solid fa-delete-left"} onClick={deleteLastChar} />
                </div>
                <div className="RowButton flex">
                    <Operation name={<span>X<sup>-1</sup></span>} onClick={reciprocal} />
                    <Operation name={<span>X<sup>2</sup></span>} onClick={square} />
                    <Operation className={"fas fa-square-root-alt"} onClick={square_root} />
                    <Operation className={"fas fa-divide"} onClick={() => updateResult("÷")} />
                </div>
                <div className='RowButton'>
                    {[9, 8, 7].map(num => (
                        <button key={num} onClick={() => updateResult(num.toString())}>{num}</button>
                    ))}
                    <Operation name={"x"} onClick={() => updateResult("x")} />
                </div>
                <div className='RowButton'>
                    {[6, 5, 4].map(num => (
                        <button key={num} onClick={() => updateResult(num.toString())}>{num}</button>
                    ))}
                    <Operation name={"-"} onClick={() => updateResult("-")} />
                </div>
                <div className='RowButton'>
                    {[3, 2, 1].map(num => (
                        <button key={num} onClick={() => updateResult(num.toString())}>{num}</button>
                    ))}
                    <Operation name={"+"} onClick={() => updateResult("+")} />
                </div>
                <div className='RowButton'>
                    <button onClick={toggle}>+/-</button>
                    <button onClick={() => updateResult("0")}>0</button>
                    <button onClick={() => updateResult(".")}>.</button>
                    <Operation name={"="} id="equal" onClick={pressEqual} />
                </div>
            </div>
        </>
    );
}

export default App;
