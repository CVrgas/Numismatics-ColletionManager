import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import styles from "../styles/AddData.module.css";
import { useForm } from "react-hook-form";

const properties = {
	coin: {
		id: 1,
		country: "Dominican Republic",
		denomination: "50",
		year: 1954,
		composition: "Silver",
		weight: "20 grams",
		diameter: "35mm",
		condition: "Uncirculated",
		mintage: 10000,
		description:
			"Commemorative coin featuring national hero Juan Pablo Duarte.",
		images: [
			"https://example.com/coin_front.jpg",
			"https://example.com/coin_back.jpg",
		],
		certification: {
			graded: true,
			grading_company: "NGC",
			grade: "MS 65",
		},
		price: 150.0,
	},
	bill: {
		id: 1,
		denomination: 20,
		currency: "USD",
		serialNumber: "AB12345678",
		issueDate: "2021-05-01",
		condition: "Very Good",
		country: "United States",
		year: 2000,
	},
};
const NumberVariable = ["year", "denomination", "mintage", "price"];

export default function AddData() {
	const [type, setType] = useState("");
	const { register, handleSubmit } = useForm();

	function handleChange(e) {
		setType(e.target.value);
	}
	const onSubmit = (data) => console.log(data);

	return (
		<div className={styles.center}>
			<h1> Enter Coin/bill data</h1>
			<form
				className={styles.UploadForm}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.photoInput}>
					<img
						src="https://fakeimg.pl/350x200/?text=World&font=lobster"
						alt="coin's photo"
					/>
					<div className={styles.UploadBtn}>
						<button>upload</button>
						<button>remove</button>
					</div>
				</div>
				<div className={styles.type}>
					<label htmlFor="type-select">Choose type:</label>
					<select
						name=""
						id="type-select"
						onChange={(e) => handleChange(e)}
						// {...register(type, { required: true })}
					>
						<option value=""></option>
						<option value="bill">bill</option>
						<option value="coin">coin</option>
					</select>
				</div>
				{type ? (
					<div className={styles.coinDetails}>
						<h2>{`${type}'s Details`}</h2>
						{Object.keys(properties[type]).map((value, i) => {
							if (value === "id") return;
							return (
								<div
									key={`${type}-${i}`}
									className={styles.inputData}
								>
									<input
										type={NumberVariable.includes(value) ? "number" : "text"}
										{...register(value)}
										placeholder=""
										required={
											value === "country" ||
											value === "denomination" ||
											value === "year"
												? true
												: false
										}
									/>
									<div className={styles.underline}></div>
									<label htmlFor={`labelFor${value}`}>{value}</label>
								</div>
							);
						})}
					</div>
				) : null}
				<div className={styles.submitArea}>
					<button type="submit">Guardar</button>
				</div>
			</form>
		</div>
	);
}