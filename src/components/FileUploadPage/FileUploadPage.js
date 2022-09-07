import React, {useState} from 'react';
import { httpManager } from '../../managers/httpManager';

const FileUploadPage = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = async (event) => {
		
		setSelectedFile(event.target.files[0]);

		const {data} = await httpManager.getPresignedUrl()
			const pipe = {
				bucket: "myawsbucketwhatsapp",
				...data.fields,
				'Content-Type': event.target.files[0].type,
				file: event.target.files[0]
			};
		const formData = new FormData();
		for (const name in pipe) {
			formData.append(name, pipe[name]);
		}

		await httpManager.uploadFileFromBrowser(data.url, formData)

		setIsFilePicked(true);
	};
	const handleSubmission = () => {
	};

	return(
   		<div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

export default FileUploadPage