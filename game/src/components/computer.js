import "./css_files/computer.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MdOutlineHelpOutline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa6";

function Computer() {
    const [you, setYou] = useState("c5");
    const [comp, setComp] = useState("c3");
    const [turn, setTurn] = useState(true);
    const [userMark, setUserMark] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [compMark, setCompMark] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [tdclass, setTdClass] = useState(["", "", "", "", "", "", "", "", ""]);
    const [gameOver, setGameOver] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkUserWins(userMark) {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (userMark[a] + userMark[b] + userMark[c] === 3) {
                return true;
            }
        }
        return false;
    }

    function checkCompWins(compMark) {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (compMark[a] + compMark[b] + compMark[c] === 3) {
                return true;
            }
        }
        return false;
    }

    function findBestMove(userMark, compMark) {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (compMark[a] + compMark[b] + compMark[c] === 2) {
                if (userMark[a] === 0 && compMark[a] === 0) return a;
                if (userMark[b] === 0 && compMark[b] === 0) return b;
                if (userMark[c] === 0 && compMark[c] === 0) return c;
            }
        }
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (userMark[a] + userMark[b] + userMark[c] === 2) {
                if (userMark[a] === 0 && compMark[a] === 0) return a;
                if (userMark[b] === 0 && compMark[b] === 0) return b;
                if (userMark[c] === 0 && compMark[c] === 0) return c;
            }
        }
        let num;
        do {
            num = Math.floor(Math.random() * 9);
        } while (userMark[num] === 1 || compMark[num] === 1);
        return num;
    }

    useEffect(() => {
        if (gameOver) {
            clearTimeout(timeoutRef.current);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [gameOver]);

    if (!turn && !gameOver) {
        timeoutRef.current = setTimeout(() => {
            if (checkUserWins(userMark)) {
                alert("You Win");
                setGameOver(true);
                navigate("/");
                return;
            }

            const bestMove = findBestMove(userMark, compMark);
            const updateMark = [...compMark];
            updateMark[bestMove] = 1;
            setCompMark(updateMark);

            const updateClass = [...tdclass];
            updateClass[bestMove] = "wrong";
            setTdClass(updateClass);

            if (checkCompWins(updateMark)) {
                alert("Computer Wins");
                setGameOver(true);
                navigate("/");
                return;
            }

            const totalMarks = [...updateMark, ...userMark].reduce((a, b) => a + b, 0);
            if (totalMarks === 9) {
                alert("Match Drawn");
                setGameOver(true);
                navigate("/");
                return;
            }
            setYou("c5");
            setComp("c3");
            setTurn(true);
        }, 2000);
    }

    function mark(id) {
        if (turn && !gameOver) {
            if (userMark[id - 1] === 0 && compMark[id - 1] === 0) {
                const updateMark = [...userMark];
                updateMark[id - 1] = 1;
                setUserMark(updateMark);

                const updateClass = [...tdclass];
                updateClass[id - 1] = "circle";
                setTdClass(updateClass);

                const totalMarks = [...updateMark, ...compMark].reduce((a, b) => a + b, 0);
                if (totalMarks === 9 && !checkUserWins(updateMark)) {
                    alert("Match Drawn");
                    setGameOver(true);
                    navigate("/");
                    return;
                }
                setYou("c5_you");
                setComp("c3_comp");
                setTurn(false);
            }
        }
    }

    return (
        <div className="full-height">
            <div className="c1">
                <div className="c2">
                    <div>
                        <NavLink to="/">
                            <IoMdHome className="icon1" />
                        </NavLink>
                    </div>
                    <div>
                        <MdOutlineHelpOutline className="icon2" />
                    </div>
                </div>
                <div className={comp}>
                        <div className="c3_2">Computer</div>
                        <div className="c3_1">
                            <ImCross className="icon3" />
                        </div>
                </div>
                <div className="c4">
                    <table>
                        <tr>
                            <td id="1" className={tdclass[0]} onClick={() => mark(1)}></td>
                            <td id="2" className={tdclass[1]} onClick={() => mark(2)}></td>
                            <td id="3" className={tdclass[2]} onClick={() => mark(3)}></td>
                        </tr>
                        <tr>
                            <td id="4" className={tdclass[3]} onClick={() => mark(4)}></td>
                            <td id="5" className={tdclass[4]} onClick={() => mark(5)}></td>
                            <td id="6" className={tdclass[5]} onClick={() => mark(6)}></td>
                        </tr>
                        <tr>
                            <td id="7" className={tdclass[6]} onClick={() => mark(7)}></td>
                            <td id="8" className={tdclass[7]} onClick={() => mark(8)}></td>
                            <td id="9" className={tdclass[8]} onClick={() => mark(9)}></td>
                        </tr>
                    </table>
                </div>
                <div className={you}>
                    <div className="c5_2">You</div>
                    <div className="c5_1">
                        <FaRegCircle className="icon4" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Computer;
