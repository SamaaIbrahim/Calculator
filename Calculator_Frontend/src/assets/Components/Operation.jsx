function Operation(props) {
    return (
        <button onClick={props.onClick} id={props.id}>
            <i className={props.className}></i>
            {props.name}
        </button>
    );
}

export default Operation;
