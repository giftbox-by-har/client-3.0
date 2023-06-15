import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

const HomePage = () => {
	const [boxTypes, setBoxTypes] = useState([]);
	const [groupedBoxTypes, setGroupedBoxTypes] = useState([]);

	useEffect(() => {
		fetchBoxTypes();
	}, []);

	useEffect(() => {
		groupBoxTypes();
	}, [boxTypes]);

	const fetchBoxTypes = async () => {
		try {
			const response = await axios.get(`${baseUrl}/box-types`);
			setBoxTypes(response.data);
			console.log("Box types retrieved successfully");
		} catch (error) {
			console.error(error);
		}
	};

	const groupBoxTypes = () => {
		const groupedData = {};
		for (const boxType of boxTypes) {
			if (!groupedData[boxType.category]) {
				groupedData[boxType.category] = {};
			}
			if (!groupedData[boxType.category][boxType.boxSize]) {
				groupedData[boxType.category][boxType.boxSize] = [];
			}
			groupedData[boxType.category][boxType.boxSize].push(boxType);
		}
		setGroupedBoxTypes(groupedData);
	};

	return (
		<div>
			{Object.keys(groupedBoxTypes).map((category) => (
				<div key={category}>
					<h2>Kategori: {category}</h2>
					{Object.keys(groupedBoxTypes[category]).map((boxSize) => (
						<div key={boxSize}>
							<h3>Box Size: {boxSize}</h3>
							{groupedBoxTypes[category][boxSize].map((boxType) => (
								<div key={boxType._id}>
									<h4>{boxType.boxName}</h4>
									<div>
										{boxType.images.length > 0 && (
											<img
												src={`${baseUrl}/${boxType.images[0]}`}
												alt="Box Type"
												style={{ width: "160px", height: "160px" }}
											/>
										)}
									</div>
									<p>Price: ${boxType.price}</p>
									<hr />
								</div>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default HomePage;
