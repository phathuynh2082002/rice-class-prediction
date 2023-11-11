import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios";
import commeo from "./commeo.png";
import osmacik from "./osmacik.png";
import content from "./content.js";

const note = content;

function App() {

  const [x, setX] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [label, setLabel] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  
  useEffect(() => {
    const cardElement = document.getElementById("myCard");
    setX(cardElement);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlePredict = () => {

    if (selectedFile) {
      // Tạo một FormData object để gửi tệp lên server
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Gửi request POST đến API của Flask
      fetch("https://server-rice-class-prediciton--nphat2082002.repl.co/predict_file", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setDataFile(data);
          console.log(dataFile);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    } else {
      console.log("Người dùng chưa tải lên tệp nào.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    x.style.display = "none";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "https://server-rice-class-prediciton--nphat2082002.repl.co/predict",
      formData,
      config
    );

    if (data === "O") {
      setLabel("Osmancik");
      setContent(
        "Trong số các giống lúa được chứng nhận được trồng ở Thổ Nhĩ Kỳ, loài Osmancik có diện tích trồng lớn từ năm 1997 đã được chọn để nghiên cứu. Khi nhìn vào đặc điểm chung của loài Osmancik, chúng có bề ngoài rộng, dài, thủy tinh và xỉn màu."
      );
      setImage(osmacik);
    } else {
      setLabel("Commeo");
      setContent(
        "Trong số các giống lúa được chứng nhận được trồng ở Thổ Nhĩ Kỳ, loài Cammeo được trồng từ năm 2014 đã được chọn để nghiên cứu. Khi nhìn vào đặc điểm chung của loài Cammeo là chúng có bề ngoài rộng và dài, thủy tinh và xỉn màu."
      );
      setImage(commeo);
    }

    if (x.style.display === "none") {
      x.style.display = "block";
    }
  };

  return (
    <div class="container">
      <div class="text">
        Classification of Rice Varieties Using Random Forest
      </div>
      <form onSubmit={submitHandler}>
        <div class="form-row">
          <div class="input-data">
            <input
              type="number"
              name="Area"
              required
              step="any"
              min="1000"
              max="30000"
            />
            <div class="underline"></div>
            <label>Area</label>
          </div>
          <div class="content">{note.Area}</div>
        </div>
        <div class="form-row">
          <div class="input-data">
            <input
              type="number"
              required
              name="Perimeter"
              step="any"
              min="0"
              max="1000"
            />
            <div class="underline"></div>
            <label>Perimeter</label>
          </div>
          <div class="content">{note.Perimeter}</div>
        </div>
        <div class="form-row">
          <div class="input-data">
            <input
              type="number"
              required
              name="Major_Axis_Length"
              step="any"
              min="0"
              max="1000"
            />
            <div class="underline"></div>
            <label>Major Axis Length</label>
          </div>
          <div class="content">{note.Major_Axis_Length}</div>
        </div>
        <div class="form-row">
          <div class="input-data">
            <input
              type="number"
              required
              name="Minor_Axis_Length"
              step="any"
              min="0"
              max="200"
            />
            <div class="underline"></div>
            <label>Minor Axis Length</label>
          </div>
          <div class="content">{note.Minor_Axis_Length}</div>
        </div>
        <div class="form-row">
          <div class="input-data">
            <input
              type="number"
              required
              name="Eccentricity"
              step="any"
              min="0"
              max="1"
            />
            <div class="underline"></div>
            <label>Eccentricity</label>
          </div>
          <div class="content">{note.Eccentricity}</div>
        </div>
        <div class="form-row">
          <div class="input-data">
            <input
              type="number"
              required
              name="Convex_Area"
              step="any"
              min="1000"
              max="30000"
            />
            <div class="underline"></div>
            <label>Convex Area</label>
          </div>
          <div class="content">{note.Convex_Area}</div>
        </div>
        <div class="form-row">
          <div class="input-data">
            <input
              type="number"
              required
              name="Extent"
              step="any"
              min="0"
              max="1"
            />
            <div class="underline"></div>
            <label>Extent</label>
          </div>
          <div class="content">{note.Extent}</div>
        </div>
        <br />
        <div class="form-row submit-btn">
          <div class="input-data">
            <div class="inner"></div>
            <input type="submit" value="predict" />
          </div>
          <div id="myCard">
            <div class="row">
              <div class="col-md-4">
                <div class="card">
                  <img src={image} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{label}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">{content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="form-row">
        <div class="button-wrapper">
          <span class="label">Upload File</span>
          <input
            name="upload"
            type="file"
            id="upload"
            class="upload-box"
            accept=".csv, .xls, .xlsx"
            onChange={handleFileUpload}
          />
        </div>
        <div class="button-wrapper">
          <span class="label" onClick={handlePredict}>
            Predict File
          </span>
        </div>
      </div>
      {
        dataFile ?  
        (
          <div class="form-row">
            <table className="result-table">
              <thead>
                <tr>
                  <th className="th-predict">Area</th>
                  <th className="th-predict">Perimeter</th>
                  <th className="th-predict">Major_Axis_Length</th>
                  <th className="th-predict">Minor_Axis_Length</th>
                  <th className="th-predict">Eccentricity</th>
                  <th className="th-predict">Convex_Area</th>
                  <th className="th-predict">Extent</th>
                  <th className="th-predict">Prediction</th>
                </tr>
              </thead>
              <tbody>
                {dataFile.map((result, index) => (
                  <tr key={index}>
                    <td className="td-predict">{parseFloat(result.Area).toFixed(1)}</td>
                    <td className="td-predict">{parseFloat(result.Perimeter).toFixed(1)}</td>
                    <td className="td-predict">{parseFloat(result.Major_Axis_Length).toFixed(1)}</td>
                    <td className="td-predict">{parseFloat(result.Minor_Axis_Length).toFixed(1)}</td>
                    <td className="td-predict">{parseFloat(result.Eccentricity).toFixed(1)}</td>
                    <td className="td-predict">{parseFloat(result.Convex_Area).toFixed(1)}</td>
                    <td className="td-predict">{parseFloat(result.Extent).toFixed(1)}</td>
                    <td className="td-predict">{result.prediction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null
      }
    </div>
  );
}

export default App;
