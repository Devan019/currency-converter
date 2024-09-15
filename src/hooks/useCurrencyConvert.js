import { useEffect, useState } from "react";
function useCurrencyConvert() {
	const [ans, setAns] = useState(0);

	useEffect(() => {
		const fetchConversion = async() => {
			const res = await fetch("/json/convert.json");
			const data = await res.json();
			setAns(data)
		};
		fetchConversion(); 
	}, []);

	return ans; 
}

export default useCurrencyConvert;
