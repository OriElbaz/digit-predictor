const canvas = document.getElementById('drawingGrid');
const ctx = canvas.getContext('2d');
const predictBtn = document.getElementById('predictBtn'); // Changed ID
const clearBtn = document.getElementById('clearBtn');

// New DOM Elements
const resultArea = document.getElementById('result-area');
const predictionText = document.getElementById('prediction-text');
const confidenceText = document.getElementById('confidence-text');

let predictionHistory = [];

let isDrawing = false;

// 1. Setup the brush style
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = 'white';
ctx.lineWidth = 8;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// 2. Drawing Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// 3. Predict Functionality
predictBtn.addEventListener('click', async () => {
    const imageURI = canvas.toDataURL("image/png");

    // UI Feedback: Change button text
    const originalText = predictBtn.innerText;
    predictBtn.innerText = "Thinking...";
    predictBtn.disabled = true;

    try {
        const response = await fetch('http://127.0.0.1:8000/predict', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_data: imageURI })
        });

        const result = await response.json();
        
        // Show Results
        predictionText.innerText = result.digit;
        confidenceText.innerText = result.confidence;
        resultArea.classList.remove('hidden');
        

        predictionHistory.push(result.digit);
        if (predictionHistory.length > 2) {
            predictionHistory.shift(); // Removes the oldest number
        }
        if (predictionHistory.length === 2) {
            if (predictionHistory[0] === 6 && predictionHistory[1] === 7) {
                setTimeout(() => {
                    alert("SIXSEVEN SIXSEVEN SIXSEVEN");
                    predictionHistory = []; 
                }, 100);
            }
        }


    } catch (error){
        console.error("Error:", error);
        alert("Failed to reach server. Error:", error);
    } finally {
        // Reset button
        predictBtn.innerText = originalText;
        predictBtn.disabled = false;
    }
});

// 4. Clear Functionality
clearBtn.addEventListener('click', () => {
    // Clear Canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Hide Results
    resultArea.classList.add('hidden');
});