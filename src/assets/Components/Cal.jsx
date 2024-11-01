import React,{useState} from "react"
function Cal (props){
    const [result,setRes]=useState("");
    var changeRes =function(e){

        setRes(r=>r+e.target.value);
    }
    return( 
       <input type="text" id="res" disabled value={props.value} />
    );
   
  
} 
export default Cal