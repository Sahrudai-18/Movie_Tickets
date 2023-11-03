console.log('javascript function');
// const dataList = document.getElementById('data-list');

var elements = document.getElementsByClassName("grid-item");

        // // Manipulate the selected elements
        // for (var i = 0; i < elements.length; i++) {
        //     elements[i].style.backgroundColor = "lightblue";
        //     elements[i].style.color = "black";
        // }

        var i=0;

// fetch('/data')
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(item => {
//             const listItem = document.createElement('li');
//             listItem.textContent = item.name;
//             dataList.appendChild(listItem);
//         });
//     })
//     .catch(error => console.error('Error fetching data:', error));

fetch('/data')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            if(item.status==0)
                  elements[i++].style.backgroundColor= "red";
            else elements[i++].style.backgroundColor="green";
        });
    })
    .catch(error => console.error('Error fetching data:', error));


    // send selected seats to node js server

    const selectedElements = new Set();

    // Function to toggle element selection
    function toggleElementSelection(element) {
      if (selectedElements.has(element.id)) {

        selectedElements.delete(element.id);
        element.classList.remove('selected');
        element.style.backgroundColor="green";
      } else {
        selectedElements.add(element.id);
        element.classList.add('selected');
        element.style.backgroundColor="grey";
      }
    }

    // Add event listener to elements for selection
    const elementElements = document.querySelectorAll('.grid-item');
    elementElements.forEach(element => {
      element.addEventListener('click', () => {
        if(element.style.backgroundColor=='red')
        {
            console.log("element is ignored");
            return;
        }
        toggleElementSelection(element);
      });
    });

    // Send selected element IDs to the server when the "Submit Selection" button is clicked
    document.getElementById('myButton').addEventListener('click', () => {
      const selectedElementIds = Array.from(selectedElements);

      if(selectedElementIds.length===0){
         alert("no tickets selected");
         return;
      }

      // Send selectedElementIds to the server using AJAX (e.g., fetch)
      fetch('/submitelements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedElementIds }),
      })
      .then(response => {
        if (response.ok) {
          console.log('Element IDs submitted successfully.');
          selectedElements.clear();
        } else {
          console.error('Failed to submit element IDs.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
