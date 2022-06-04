import Card from "./Card";

function Main( props ){
    return <div className="flex flex-wrap">
        {props.item.map((ele,i)=><Card key={i} title={ele.title} category={ele.category} price={ele.price} desc={ele.desc}  img={ele.img} />)}
    </div>
}

export default Main;