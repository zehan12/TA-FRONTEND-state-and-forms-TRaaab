function Card( props ){
    return (
        <div className="flex w-5/12 ml-20 pt-10">
            <div>
            <img className="border-2 m-5 text-yellow-700 border-yellow-500" src={props.img} alt={props.category} width="230px" height="150px" />
            </div>
            <div>
                <div className="flex pt-5 w-80 justify-between">
                    <h2 className=""> {props.title} </h2>
                    <strong className="text-yellow-500">${props.price}</strong>
                </div>
                <div>
                    <div className="grid place-items-center mt-2 mb-2 h-1 w-80 bg-yellow-500 ">
                        <div></div>
                        <div></div>
                    </div>
                    <p>{props.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;