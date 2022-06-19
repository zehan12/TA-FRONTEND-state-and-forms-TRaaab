import React from "react";
import { flushSync } from "react-dom";
import products from "../data/products";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isCartOpen: false,
      select: "Select",
      products: [],
      activeSize: [],
      sorterdFilteredArray: [],
      LoadingSpinner: true,
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    }
  }

  handleCartToggle = () => {
    console.log(this.state.isCartOpen, "cart open")
    this.setState(prevState => ({
      isCartOpen: !prevState.isCartOpen
    }))
  }

  handleSize = (size) => {
    let arr = [];
    if (this.state.activeSize.includes(size)) {
      arr = this.state.activeSize.filter((v) => v !== size)
    } else {
      // arr = this.state.activeSize.concat(size);
      arr = [...this.state.activeSize, size];
    }
    this.setState({ activeSize: arr }, () => this.sortData());

  }

  handleSort = ({ target }) => {
    let { name, value } = target
    this.setState({ [name]: value, products: [] }, () => this.sortData());
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ LoadingSpinner: false }) }, 1000);
    console.log("mount")
  }

  componentDidUpdate() {
    console.log("update")
  }

  componentWillUnmount() {
    console.log("unmont")
  }

  addItemInCart = (item) => {
    let arr = this.state.cart
    let itemFound = arr.find(ele => ele.id === item.id)
    if (itemFound) {
      itemFound.quantity = itemFound.quantity + 1;
    } else {
      item.quantity = 1;
      arr.push(item)
    }
    this.setState({ cart: arr });
    window.localStorage.setItem("cart",JSON.stringify(this.state.cart))
  }

  handleRemove = ( id, index  ) => {
    this.setState(prevState => ({
        cart: prevState.cart.filter(item => item.id !== id)            
   }));
  }

  handleIncrement = ( item, index ) => {
    const updatedCart = [...this.state.cart]
    updatedCart[index].quantity++
    this.setState( { cart: updatedCart } )
  }

  handleDecrement = ( item, index ) => {
    const updatedCart = [...this.state.cart]
    updatedCart[index].quantity--
    this.setState( { cart: updatedCart } )
  }

  getTotalPrice = ( cart ) => {
    let SUBTOTAL = 0;
    let installments = 0;
    if ( cart.length === 0 ) { 
      return 0
      } else  {  
        SUBTOTAL = cart.reduce((total,item)=>{
            if ( installments < item.installments  ) {
              installments = item.installments;
            }
           total+= ( item.price*item.quantity) 
           return total
          },0 )
      }
    return[SUBTOTAL.toFixed(2),installments,(SUBTOTAL/installments).toFixed(2)]

  }


  sortData = () => {
    const value = this.state.select;
    this.setState({ LoadingSpinner: true })
    let allProduct = products;
    let filterProduct = allProduct
    if (this.state.activeSize.length > 0) {
      filterProduct = allProduct.filter((product) => product.availableSizes.some((size) => this.state.activeSize.includes(size)))
    }
    if (value === "H2L") {
      filterProduct.sort((a, z) => parseFloat(z.price) - parseFloat(a.price))
      setTimeout(() => { this.setState({ sorterdFilteredArray: filterProduct, LoadingSpinner: false }) }, 500);
    }
    if (value === "L2H") {
      filterProduct.sort((a, z) => parseFloat(a.price) - parseFloat(z.price))
      setTimeout(() => { this.setState({ sorterdFilteredArray: filterProduct, LoadingSpinner: false }) }, 500);
    }
    if (value === "Select") {
      setTimeout(() => { this.setState({ sorterdFilteredArray: filterProduct, LoadingSpinner: false }) }, 500);
    }
  }


  render() {
    console.log("render")
    let displayProduct = this.state.sorterdFilteredArray.length === 0 ? products : this.state.sorterdFilteredArray;
    return (
      <div className="flex">
        <Sidebar sizes={products}
          activeSize={this.state.activeSize}
          handleSize={this.handleSize}
        />
        <main className="flex flex-col mt-14 w-2/3">
          <Head count={displayProduct.length}
            onChange={this.handleSort}
          />

          {this.state.LoadingSpinner ? <LoadingSpinner /> :
            <ProductList products={displayProduct}
              AddToCart={this.addItemInCart}
            />}


        </main>
        <Cart handleCartToggle={this.handleCartToggle}
          isCartOpen={this.state.isCartOpen}
          cart={this.state.cart}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
          handleRemove={this.handleRemove}
          total={this.getTotalPrice}
        />
      </div>
    );
  }
}

const Sidebar = (props) => {
  let sizes = props.sizes.reduce((acc,cv)=>acc.concat(cv.availableSizes),[]).filter((v, i, a) => a.indexOf(v) === i)
  let classes = "cursor-pointer bg-gray-200 p-4 m-3 pr-3 text-xs a"
  return <div className="subpixel-antialiased text-normal p-14 h-screen w-80 ">
    <h3>Sizes:</h3>
    <div className="flex flex-wrap mt-5 w-60">
      {
        sizes.map((size, i) => {
          let activeClass = props.activeSize.includes(size) ? "active " : "";
          return <button key={size} onClick={() => { props.handleSize(size) }} className={activeClass + classes} style={{ heigth: "60px", width: "45px", borderRadius: "50%" }} >{size}</button>
        })
      }
    </div>
    <p className="mt-5 text-xs subpixel-antialiased">follow me on Github if you like this layout my username is @zehan12</p>
  </div>
}

const Head = (props) => {
  return <div className="flex justify-between subpixel-antialiased text-normal ml-2 px-2 ">
    <h4 className="pl-2">{props.count} Product(s) found</h4>
    <form>
      <label>Order By:</label>
      <select className="shadow leading-tight text-sm focus:none w-36 px-1 pr-0 py-2 mx-2 mr-1" name="select" onChange={props.onChange}  >
        <option value="Select">Select</option>
        <option value="L2H">Lowest to Highest</option>
        <option value="H2L">Highest to Lowest</option>
      </select>
    </form>
  </div>
}

const ProductList = (props) => {
  return <div className="w-full my-7 ml-2  flex flex-wrap items-baseline">
    {
      props.products.map((product) => <ProductCard
        img={product.sku}
        currencyFormat={product.currencyFormat}
        key={product.id}
        installments={product.installments}
        isFreeShipping={product.isFreeShipping}
        price={product.price}
        title={product.title}
        style={product.style}
        availableSizes={product.availableSizes}
        id={product.id}
        addItemInCart={props.AddToCart}
      />)
    }
  </div>
}

const ProductCard = ({ img, currencyFormat, installments, isFreeShipping, price, title, addItemInCart, style, availableSizes, id }) => {
  let items = { img, currencyFormat, installments, isFreeShipping, price, title, style, availableSizes, id }
  let amount = String(price).split(".")
  return <div className=" mb-10 mx-4 text-center w-52">
    {isFreeShipping &&
      <p className="absolute bg-black text-white text-xs font-normal subpixel-antialiased px-2 ml-28 pl-3 tracking-tight">
        Free shipping</p>
    }
    <img onError={(err) => console.log(err)} src={`../static/products/${img}_1.jpg`}
      // onMouseOver={e =>{ e.target.src=`../static/obiONE.jpeg` }}
      // onMouseOut={e => e.target.src=`../static/products/${img}_1.jpg`}
      alt="img"
    />
    <div className="my-2">
      <h4 className="text-sm font-normal  pt-4 px-4 mb-3" style={{ paddingBottom: title.length > 4 && title.length < 24 ? "20px" : "" }} >{title}</h4>
    </div>
    <div className="border-solid border-2 w-4 ml-24 my-2 border-amber-500"></div>
    <div className="flex items-baseline ml-16" >
      <p className="text-xs not-italic">{currencyFormat}</p>
      <p><b className="text-3xl">{amount[0]}</b>{amount[1] ? "." + amount[1] : ".00"}</p>
    </div>
    <div className="flex ml-16 text-gray-500">
      {installments ? <p> or {installments} x</p> : <p className="h-6"> </p>}
      <p className="font-bold">{installments > 0 ? currencyFormat + "" + (price / installments).toFixed(2) : ""}</p>
    </div>
    <button onClick={() => { addItemInCart(items) }} className="bg-black hover:bg-yellow-400 text-white text-sm mt-3 font-normal subpixel-antialiased py-3 px-16 ">Add To Cart</button>
  </div>
}


const Cart = ({ isCartOpen, handleCartToggle, cart, handleIncrement, handleDecrement, handleRemove, total }) => {
  let amount = total(cart)
  return <div>
    {isCartOpen ?
      <div className="flex fixed right-1 max-h-screen	">
        <div className=" text-white pt-3 pb-4 w-14 pl-5 h-12" style={ {backgroundColor:"rgb(27,26,32)"} }>
          <button onClick={handleCartToggle}>X</button>
        </div>
        <div className=" w-full h-screen" style={ {backgroundColor:"rgb(27,26,32)"} }>
          <CartHeader count={cart.length} />


          <div className="mt-10 overflow-y-scroll p-3 mx-3x" style={{ height: "63%", backgroundColor:"rgb(27,26,32)" }}>
              { 
                cart.length === 0 ?
                  <div className="text-center mt-16 text-white"> 
                    <p>Add some products in the cart</p>
                    <br></br>
                    <p>{":)"}</p> 
                  </div>
                
                :
                cart.map( ( item,index )=>{
                  return <CartItemCard
                    item={item}
                    index={index}
                    key={ item.id }
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    handleRemove={handleRemove}
                  />})
              }
          </div>
 
          <div className="py-1" style={ {backgroundColor:"rgb(27,26,32)", boxShadow:" 0 -10px 20px -5px rgba(115,115,115,0.75)"} }>
            <div className="flex justify-between items-center	mx-2 pt-2 text-right text-gray-700 px-5 my-1 " >
              <div className="ml-3">
                <h3 className="text-gray-400">SUBTOTAL</h3>
              </div>
              <div className="mr-3">
                <p className="font-normal text-2xl text-amber-500">${amount[0]}</p>
                <p className="text-gray-400" >OR UP TO {amount[1]} x $ {amount[2]}</p>
              </div>
            </div>
            <div className="text-center mt-6 p-2">
              <button onClick={()=>alert(`SUBTOTAL = $${amount[0]}`)} className="w-96 h-10 bg-black mb-5 text-white">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div> :
      <div className="bg-black text-white absolute right-1 pr-8 pt-6 pb-6 pl-5">
        <button onClick={handleCartToggle}>
          <img className="w-12" src="../static/bag-icon.png" alt="cart" />
          <span className="absolute self-center top-14 left-14 bg-yellow-400 text-black rounded-full pl-2 pr-2"> {cart.length} </span>
        </button>
      </div>
    }
  </div>

}

const CartHeader = ( { count } ) => {
  return <>
    <div className="pl-52 pr-52 mt-12 flex">
      <div>
        <img className="w-12 mr-5 " src="../static/bag-icon.png" alt="cart" />
        <span className="absolute top-16 mt-5 ml-7 bg-yellow-400 text-black rounded-full pl-2 pr-2"> {count}</span>
      </div>
      <h2 className="text-white mt-2">CART</h2>
    </div>
  </>
}

const CartItemCard = ( props ) => {
  return <div className="flex justify-between  border-t-2 border-black m-2 pt-2" style={ {backgroundColor:"rgb(27,26,32)"} }>
          <div className="flex">
            <img className="w-20 mr-3" src={`../static/products/${props.item.img}_2.jpg`} alt="photos" />
            <div className="mt-4">
              <h4 className="text-white">{ props.item.title }</h4>
              <h3 className="text-gray-400" >{ props.item.availableSizes[0] } | { props.item.style }</h3>
              <h3 className="text-gray-400" >Quantity: { props.item.quantity }</h3>
            </div>
          </div>
          <div  className="text-right mr-3">
            <button onClick={ ()=>props.handleRemove(props.item.id,props.index) } className="font-bold not-italic text-lg">X</button>
            <p className="my-1 mb-3 text-amber-400">${props.item.price}</p>
            <div>
              <span className="p-1 px-2 text-lg bg-black text-white"><button onClick={ ()=>props.handleIncrement(props.item,props.index) } >+</button></span>
              <span className="p-1 px-2 text-lg bg-black text-white"><button onClick={ ()=>props.handleDecrement(props.item,props.index) }
               
               disabled={ props.item.quantity === 1 ? true : false }>-</button></span>
            </div>
          </div>
      </div>
}


const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}


export default App;


