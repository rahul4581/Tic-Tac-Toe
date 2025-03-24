import {NavLink} from "react-router-dom";
function Home(){
    const tic =require("./tictactoe.jpg")
    const ttt=require("./ttt.png");    
    return(
        <div className="d2">
            <form>
                <img className="i2" src={tic}/><br></br>
                <NavLink to="/play"><input type="button"value="PLAY"></input></NavLink><br></br><br></br><br></br>
                <input type="button"value="RULES"></input>
            </form>
        </div>
    )
}
export default Home;