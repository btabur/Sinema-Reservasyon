
const container = document.querySelector(".container");
const infoText = document.querySelector('.info-text');
const movieSelect = document.querySelector('#movie');  

const seats = document.querySelectorAll('.seat:not(.reserved)');  // .seat sınıfına sahip olan ve .reserved sınıfınasahip olmayanları alıyoruz
//console.log(seats);   

//burada olunca hata veriyor
//getSeatDataFromDatabase();
//calculateTotal();

container.addEventListener("click",(event)=> {

    if(event.target.offsetParent.classList.contains('seat') &&
    !event.target.offsetParent.classList.contains('reserved')) {

        event.target.offsetParent.classList.toggle('selected')
        calculateTotal()
    }

})

const getSeatDataFromDatabase = ()=> {

    const dbSelectedMovie=JSON.parse(localStorage.getItem('movieIndex'));
    if(dbSelectedMovie) {
        movieSelect.selectedIndex=dbSelectedMovie;
    }

    const dbSelectedSeats = JSON.parse(localStorage.getItem('selectedIndex'));

    if(dbSelectedSeats !=null && dbSelectedSeats.length > 0) {

        seats.forEach((seat,index) => {
            if(dbSelectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

}

const saveToDataBase =(seatIndexData)=> {

    localStorage.setItem('selectedIndex',JSON.stringify(seatIndexData))
    localStorage.setItem('movieIndex',JSON.stringify(movieSelect.selectedIndex))
}
const findSelectedSeatsIndex=()=> {

    /* Veri Tabanı işlemleri***** */
    const selectedSeats =container.querySelectorAll('.seat.selected');
   
    const allSeatsArray = []
    const allSelectedSeatsArray = []
   
    seats.forEach((seat)=> {  //nodelist i arraya çevirdik index verebilmek için
        allSeatsArray.push(seat)
    })
   
    selectedSeats.forEach((selectedSeat)=> {
        allSelectedSeatsArray.push(selectedSeat)
    })
   
   let selectedIndexs=  allSelectedSeatsArray.map((allselectedSeat)=> { //seçilen koltukların tüm koltuklar içerisindeki index numaralarını bulur ve ilgili değişkene dizi olarak atar.
      return  allSeatsArray.indexOf(allselectedSeat)
    })
   
   //console.log(selectedIndexs)
   saveToDataBase(selectedIndexs)
   }


const calculateTotal=() => {
    findSelectedSeatsIndex();
   

    /******Hesaplama işlemleri */

    let selectedSeatCount=container.querySelectorAll('.seat.selected').length;
    //console.log(selectedSeatCount);

    if(selectedSeatCount > 0) {
        infoText.style.display='block';
    }else {
        infoText.style.display='none';
    }
    let total = movieSelect.value * selectedSeatCount;
    //console.log(total);
    infoText.innerHTML = `
    <span> ${selectedSeatCount}</span> koltuk için hesaplanan ücret <span>${total}</span> TL
    `
}
getSeatDataFromDatabase();
calculateTotal();

movieSelect.addEventListener('change',()=> {
   calculateTotal()
});

