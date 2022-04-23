// serach bar
var searchBar = document.getElementById("search-box");
// make empty array
// apply keyup function
$.get(
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
  function (url) {
    dataUrl = url;
    tableDataCreate(url);
  }
);
var dataUrl;
// this array used for store cliked id's id number
var indexStoreArr = [];
const tableDataCreate = (char) => {
  const rowsList = char
    .map((character, i) => {
      return `
            <tr id=${i} onclick="rowBgChange(${i})" class="">
                  <td class="column1">${character.id}</td>
                  <td class="column2">${character.firstName}</td>
                  <td class="column3">${character.lastName}</td>
                  <td class="column4">${character.email}</td>
                  <td class="column5">${character.phone}</td>
                </tr>
        `;
    })
    .join("");
  t_body.innerHTML = rowsList;
};
searchBar.addEventListener("keyup", (e) => {
  // get serach value
  const serachItem = e.target.value.toLowerCase();
  //   filter while seraching
  const filteredCharacters = dataUrl.filter((character) => {
    return (
      character.firstName.toLowerCase().includes(serachItem) ||
      character.lastName.toLowerCase().includes(serachItem) ||
      character.email.toLowerCase().includes(serachItem)
    );
  });
  tableDataCreate(filteredCharacters);
});
function rowBgChange(index) {
  // get the particular row with the support of index
  var row = document.getElementById(`${index}`);
  // get that row id.
  let rowIndex = row.id;

  // check id and index is same, if same apply active class.
  if (rowIndex == index) {
    row.classList.add("active");
  }
  // get details wrapper
  var info_wrapper = document.getElementById("info-wrapper");
  // ger url with particulat rows
  var personDetail = dataUrl[index];
  // apply all the items in correct positions
  info_wrapper.innerHTML = `
    <h1>Details</h1>
        <p>Click on a table item to get detailed information</p>
        <div id="info-content">
          <div><b>User selected:</b> ${personDetail.firstName}  ${personDetail.lastName}</div>
          <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>
                       ${personDetail.description}
                    </textarea
            >
          </div>
          <div><b>Address:</b> ${personDetail.address.streetAddress}</div>
          <div><b>City:</b> ${personDetail.address.city}</div>
          <div><b>State:</b> ${personDetail.address.state}</div>
          <div><b>Zip:</b> ${personDetail.address.zip}</div>
        </div>
  `;

  // row heighlighted
  // store all cliked id's in sperate array
  indexStoreArr.push(index);
  // find the secound last item in that array.
  var prevId = indexStoreArr[indexStoreArr.length - 2];
  // then find the index and item
  var curentRow = document.getElementById(prevId);
  // compare if items not undefiend the remove active class.
  if (prevId !== undefined) {
    curentRow.classList.remove("active");
  }
  // after remove when clik again the same row , active class is gone, so we need to apply one condition here.
  if (
    indexStoreArr[indexStoreArr.length - 2] ==
    indexStoreArr[indexStoreArr.length - 1]
  ) {
    curentRow.classList.add("active");
  }
}
