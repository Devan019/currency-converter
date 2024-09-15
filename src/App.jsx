import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import useCurrencyConvert from './hooks/useCurrencyConvert';
import useCurrencyInfo from './hooks/useInfo';
import useNames from './hooks/useNames';
import './App.css';

function App() {
    const ans = useCurrencyConvert();
    const currencyInfo = useCurrencyInfo();
    currencyInfo.sort();

    const allCurrency = useNames();

    const [from, setFrom] = useState("INR");
    const [to, setTo] = useState("USD");
    const [finalAns, setFinalAns] = useState(0);
    const [amount, setAmount] = useState(0);
    const [first, setFirst] = useState(false);
    const [btnstate, setBtnstate] = useState(false);
    const [shortForm, setShortForm] = useState([]);
    const [fullForm, setFullForm] = useState([]);
    const [search, setSearch] = useState(""); // New state for search term

    useEffect(() => {
        let tl = gsap.timeline();
        tl.to("#allc", {
            left: 0,
        })

        tl.pause();

        document.querySelector("#showbtn").addEventListener("click", (r) => {
            tl.play();
        })

        document.querySelector("#closebtn").addEventListener("click", (params) => {
            tl.reverse();
        })

    },)



    useEffect(() => {
        const timer = setTimeout(() => {
            document.querySelector(".forHide").classList.remove("hidden");
            const short = [];
            const full = [];
            Object.entries(allCurrency).forEach(([shortCode, fullName]) => {
                short.push(shortCode);
                full.push(fullName);
            });
            setShortForm(short);
            setFullForm(full);
        }, 100);

        return () => clearTimeout(timer);  // Cleanup timer on component unmount
    }, [allCurrency]);

    useEffect(() => {
        const formState = ans[from];
        const toState = ans[to];
        if (first) {
            setFinalAns((toState / formState) * amount);
        }
    }, [btnstate]);

    const swap = () => {
        const t = to;
        setTo(from);
        setFrom(to);
        setBtnstate((prev) => !prev);
    };

    const filteredCurrencies = shortForm
        .map((short, idx) => ({
            short,
            full: fullForm[idx],
            rate: ans[short],
        }))
        .filter(({ short, full }) =>
            short.toLowerCase().includes(search.toLowerCase()) ||
            full.toLowerCase().includes(search.toLowerCase()) ||
            toString(rate).toLowerCase().includes(search.toLowerCase())
        );

    return (
        <>
            <div
                className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat absolute top-0 right-0"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                }}
            >
                <button
                    id='showbtn'
                    className="bg-blue-600 hover:bg-blue-500 p-4 rounded-xl absolute left-4 top-3 text-white text-2xl">
                    Show all Currency
                </button>

                <div className="text-white relative" id="allc">
                    <button id='closebtn' className="absolute right-4 top-5">close</button>
                    <input
                        id="search"
                        className="mt-12 ml-1 text-black"
                        value={search}
                        onChange={(evt) => setSearch(evt.target.value)}
                        type="text"
                        placeholder="Search currency"
                    />
                    <div>
                        {filteredCurrencies.map((val, index) => (
                            <div className="p-2" key={index}>
                                <div className="con bg-gray-600 p-2 flex justify-between items-center rounded-lg">
                                    <div>
                                        <span className="shorts text-white text-xl font-semibold mr-2">
                                            {val.short}:
                                        </span>
                                        <span className="fulls text-gray-300 text-lg">
                                            {val.full}
                                        </span>
                                    </div>
                                    <div className="rate text-green-400 text-lg font-semibold">
                                        {val.rate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="w-full hidden forHide">
                    <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                        <div className="w-full mb-1 flex justify-between bg-white p-4 rounded-xl">
                            <div className="flex flex-col relative">
                                <div className="text-gray-500 text-xl">From</div>
                                <input
                                    min={0}
                                    defaultValue={0}
                                    onChange={(evt) => setAmount(evt.target.value)}
                                    className="bg-transparent text-gray-500"
                                    type="number"
                                />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div className="text-gray-500 text-xl">Currency Type</div>
                                <select
                                    value={from}
                                    onChange={(evt) => setFrom(evt.target.value)}
                                    name="rate"
                                    id="rate"
                                >
                                    {currencyInfo.map((val) => (
                                        <option key={val} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                onClick={swap}
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-400"
                            >
                                Swap
                            </button>
                        </div>
                        <div className="w-full bg-white flex justify-between mb-3 p-4 rounded-xl">
                            <div>
                                <div className="text-gray-500 text-xl">To</div>
                                <input
                                    value={finalAns}
                                    readOnly
                                    className="bg-transparent text-gray-500"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div className="text-gray-500 text-xl">Currency Type</div>
                                <select
                                    value={to}
                                    onChange={(evt) => setTo(evt.target.value)}
                                    name="rates"
                                    id="rates"
                                >
                                    {currencyInfo.map((val) => (
                                        <option key={val} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            onClick={() => {
                                setBtnstate((prev) => !prev);
                                setFirst(true);
                            }}
                            className="hover:bg-blue-400 w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                        >
                            Convert {from} to {to}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
