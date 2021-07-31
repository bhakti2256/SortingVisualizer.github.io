var array = [];
let max = 400;
let min = 20;
var delay;

function slider() {
    var slider = document.getElementById("myRange");
    slider.oninput = function () {
        var arraySize = this.value;
        var width = Math.floor(750 / arraySize)
        array.length = 0;
        const removeElements = (elms) => elms.forEach(el => el.remove());
        removeElements(document.querySelectorAll(".bar"));
        generateNewArray(arraySize, width);
    }
}

function ResponsiveSlider() {
    var slider = document.getElementById("ResponsiveRange");
    slider.oninput = function () {
        var arraySize = this.value;
        var width = Math.floor(380 / arraySize)
        array.length = 0;
        const removeElements = (elms) => elms.forEach(el => el.remove());
        removeElements(document.querySelectorAll(".bar"));
        generateNewArray(arraySize, width);
    }
}

function changeSpeed() {
    var slider = document.getElementById("speedSlider");
    slider.oninput = function () {
        delay = slider.value;
    }
}

function selectAlgo() {
    var algo = document.getElementById("selectAlgo").value;
    if (algo === "bubble") bubbleSort()
    else if (algo === "selection") selectionSort()
    else if (algo === "insertion") insertionSort()
    else if (algo === "quick") quickSort()
    else if (algo === "merge") mergeSort()
}

function generateNewArray(arraySize, width) {
    var bars;
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * (max - min) + min));
        bars = document.createElement("DIV");
        var elem = document.getElementById("bar-components");
        elem.appendChild(bars);
        bars.style.height = ` ${array[i]}px `;
        bars.style.width = ` ${width}px `;
        bars.classList.add("bar");
        bars.setAttribute('id', `${i}`);
    }
}

function generateArray() {
    for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * (max - min) + min);
        let elem = document.getElementById(`${i}`);
        elem.style.height = ` ${array[i]}px `;
    }
}

//disable buttons
function disableButton(buttonId, status) {
    button = [bubble, selection, insertion, quick, merge, generate];
    for (let i = 0; i < button.length; i++) {
        if (i !== buttonId) {
            if (status) {
                button[i].disabled = true;
                document.getElementById("myRange").disabled = true;
                document.getElementById("ResponsiveRange").disabled = true;
            } else {
                button[i].disabled = false;
                document.getElementById("myRange").disabled = false;
                document.getElementById("ResponsiveRange").disabled = false;
            }
        }
    }
}

//bubble sort
async function bubbleSort() {
    disableButton(0, true);
    let n = array.length;
    let arrayBars = document.querySelectorAll(".bar");
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // To change background-color of the blocks to be compared
            arrayBars[j].style.backgroundColor = "red";
            arrayBars[j + 1].style.backgroundColor = "red";

            //wait for .1s
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            let elem2 = document.getElementById(`${j + 1}`);
            let elem1 = document.getElementById(`${j}`);
            if (array[j] > array[j + 1]) {

                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                elem1.style.height = `${array[j]}px`;
                elem2.style.height = `${array[j + 1]}px`;
                arrayBars = document.querySelectorAll(".bar");
            }
            // Changing the color to the previous one
            arrayBars[j].style.backgroundColor = "#021f54";
            arrayBars[j + 1].style.backgroundColor = "#021f54";
        }
        //changing the color of greatest element 
        //found in the above traversal
        arrayBars[arrayBars.length - i - 1].style.backgroundColor = "#2c5cb3";
    }
    //change bg color again to #021f54
    arrayBars.forEach(element => {
        element.style.backgroundColor = "#021f54";
    });
    disableButton(0, false);
}

//selection sort
async function selectionSort() {
    disableButton(1, true)
    let arrayBars = document.querySelectorAll(".bar")
    //Algorithm
    //run a loop to get min elem at index i + 1
    let min;
    for (let i = 0; i < array.length - 1; i++) {
        min = i;
        //change color of min element to red
        arrayBars[i].style.backgroundColor = "#2c5cb3"

        for (let j = i + 1; j < array.length; j++) {
            //change color of jth bar
            arrayBars[j].style.backgroundColor = 'darkgrey'

            //waiting time
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay));

            if (array[j] < array[min]) {
                min = j;
            }
        }
        //now we get min elem at index i
        if (min != i) {
            //swap to get sorted array on left side
            [array[min], array[i]] = [array[i], array[min]];
            [arrayBars[min].style.height, arrayBars[i].style.height] = [arrayBars[i].style.height, arrayBars[min].style.height]
            arrayBars[min].style.backgroundColor = 'red'
        }
    }
    arrayBars.forEach(element => {
        element.style.backgroundColor = "#021f54";
    });
    disableButton(1, false)
}

//insertion sort
async function insertionSort() {
    disableButton(2, true)
    let i, j, key;
    let arrayBars = document.querySelectorAll(".bar");
    // sorted side color change to white
    arrayBars[0].style.backgroundColor = "#2c5cb3";
    for (i = 1; i < array.length; i++) {
        arrayBars[i].style.backgroundColor = "red"

        //pause for delay sec
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        )

        key = array[i];
        j = i - 1;

        // Algorithm
        while (j >= 0 && key < array[j]) {
            arrayBars[j].style.backgroundColor = "red";

            arrayBars[j + 1].style.height = arrayBars[j].style.height;
            array[j + 1] = array[j];
            j = j - 1;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            )

            // Provide white color to the sorted part
            for (let k = i; k >= 0; k--) {
                arrayBars[k].style.backgroundColor = "#2c5cb3";
            }
        }
        array[j + 1] = key;
        arrayBars[j + 1].style.height = `${key}px`;
    }
    arrayBars.forEach(element => {
        element.style.backgroundColor = "#021f54";
    });
    disableButton(2, false)
}

//quick sort
async function quickSort() {
    disableButton(3, true);
    // call the quickSort recursive function
    startIdx = 0;
    endIdx = array.length - 1;
    await quickSortHelper(array, startIdx, endIdx);
    // console.log(array)
    // change#021f54(array)
    let arrayBars = document.querySelectorAll(".bar");
    arrayBars.forEach(element => {
        element.style.backgroundColor = "#021f54";
    });
    disableButton(3, false);
}

async function quickSortHelper(array, startIdx, endIdx) {
    if (startIdx < endIdx) {
        let partitionIdx = await partition(array, startIdx, endIdx);
        //recursive call for left half and right half
        await quickSortHelper(array, startIdx, (partitionIdx - 1));
        await quickSortHelper(array, (partitionIdx + 1), endIdx);
    }
}

async function partition(array, startIdx, endIdx) {
    let arrayBars = document.querySelectorAll(".bar")

    let pivot = array[endIdx]; //select last elem as pivot
    arrayBars[endIdx].style.backgroundColor = "red"

    let pivotIdx = startIdx;

    //wait
    let temp;
    for (let i = startIdx; i < endIdx; i++) {
        arrayBars[i].style.backgroundColor = "darkgrey"
        //wait
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        )
        if (array[i] < pivot) {
            //swap
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            //swap
            temp = arrayBars[i].style.height;
            arrayBars[i].style.height = arrayBars[pivotIdx].style.height;
            arrayBars[pivotIdx].style.height = temp;
            pivotIdx++;
            // arrayBars[i].style.backgroundColor = "grey"
            // arrayBars[pivotIdx].style.backgroundColor = "grey"
        }
    }

    ///swap pivot elem to its correct position
    [array[endIdx], array[pivotIdx]] = [array[pivotIdx], array[endIdx]]

    temp = arrayBars[endIdx].style.height;
    arrayBars[endIdx].style.height = arrayBars[pivotIdx].style.height;
    arrayBars[pivotIdx].style.height = temp;
    arrayBars[pivotIdx].style.backgroundColor = "#2c5cb3";
    arrayBars[endIdx].style.backgroundColor = "#2c5cb3";
    //wait
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delay)
    )
    return pivotIdx;
}

async function mergeSort() {
    disableButton(4, true);
    await mergeSortHelper(array, 0, array.length - 1);
    console.log(array)
    let arrayBars = document.querySelectorAll(".bar")
    arrayBars.forEach(element => {
        element.style.backgroundColor = "#021f54";
    });
    disableButton(4, false);
}

async function mergeSortHelper(array, startIdx, endIdx) {
    if (startIdx < endIdx) {
        let midIdx = Math.floor((startIdx + endIdx) / 2);
        await mergeSortHelper(array, startIdx, midIdx)
        await mergeSortHelper(array, midIdx + 1, endIdx)
        await mergeArrays(array, startIdx, midIdx, endIdx)
    }
}
async function mergeArrays(array, startIdx, midIdx, endIdx) {
    let arrayBars = document.querySelectorAll(".bar")
    let i, j, k;
    i = startIdx;
    j = midIdx + 1;
    k = startIdx; // to keep track of temp array
    let tempArray = [];
    // arrayBars[i].style.backgroundColor = "red"
    // arrayBars[j].style.backgroundColor = "red"

    while (i <= midIdx && j <= endIdx) {
        arrayBars[i].style.backgroundColor = "red"
        arrayBars[j].style.backgroundColor = "red"
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        )
        if (array[i] <= array[j]) {
            tempArray[k++] = array[i++]
        } else {
            tempArray[k++] = array[j++]
        }
    }

    while (i <= midIdx) tempArray[k++] = array[i++];
    while (j <= endIdx) tempArray[k++] = array[j++];

    for (let p = startIdx; p <= endIdx; p++) {
        array[p] = tempArray[p]
        arrayBars[p].style.height = `${tempArray[p]}px`
        arrayBars[p].style.backgroundColor = "#2c5cb3"
    }
}
