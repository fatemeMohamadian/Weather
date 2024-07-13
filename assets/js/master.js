const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    grabCursor:true,
    slidesPerView: 5,
})
//////// sidebar clicks ///////////////
const listic = document.querySelectorAll('.setting>li')
listic.forEach((val) => {
    val.addEventListener('click', () => {
        listic.forEach((item) => {
            item.style.border = 'none'
        })
        val.style.borderLeft = '5px solid rgb(235, 69, 13)'
    })
})
//////// sidebar clicks ///////////////
///////////// header- search/////////////
const optionlist = document.querySelectorAll('.option>li')
const pinitem = document.querySelector('.pinitem')
optionlist[0].addEventListener('click', () => {
    window.location.reload()
})
optionlist[1].addEventListener('click', (e) => {
    e.target.parentElement.parentElement.parentElement.style.display = 'none'
})
listic[3].addEventListener('click', () => {
    pinitem.style.display = 'flex'
})
///////////// header- search/////////////
//////////// section 1- fetch- city tehran//////////////
const tempcity = document.querySelectorAll('.tempcity>*')
const sliderday = document.querySelector('.swiper-wrapper')
let mydate = new Date()
gettehran()
async function gettehran() {
    const url = await fetch('https://api.openweathermap.org/data/2.5/forecast?appid=dfbe068cb492a39f4026611208dc449e&units=metric&cnt=25&q=tehran')
    const res = await url.json()
    // console.log(res);
    tempcity[0].innerHTML = `${res.city.name}, ${res.city.country}`
    tempcity[1].firstElementChild.nextElementSibling.innerHTML = `${Math.floor(res.list[0].main.temp)}`
    tempcity[1].firstElementChild.innerHTML = `<img src="https://openweathermap.org/img/wn/${res.list[0].weather[0].icon}.png">`
    tempcity[2].innerHTML = `${res.list[0].weather[0].description}`
    tempcity[3].innerHTML = `Updated as of ${reformatdate(mydate)} `
    tempcity[4].innerHTML = `Wind: ${res.list[0].wind.speed} km/h`
    tempcity[5].innerHTML = `Feels Like: ${res.list[0].main.feels_like}<i class="icon-celcius" style="font-size:25px;"></i>`
    tempcity[6].innerHTML = `Min: ${Math.floor(res.list[0].main.temp_min)}<i class="icon-celcius" style="font-size:25px;"></i>`
    ///////////////////////////////
    res.list.map((val, index) => {
        // console.log(val);
        let day = new Date(val.dt_txt)
        let box = document.createElement('div')
        box.classList.add('swiper-slide')
        box.innerHTML = `
                        <h4>${reformatday(day)}</h4>
                        <h5>${reformatdate(day)}</h5>
                        <div><img src="https://openweathermap.org/img/wn/${val.weather[0].icon}.png"></div>
                         <h3>${Math.floor(val.main.temp)}<i class="icon-celcius" style="font-size:25px;"></i> <span>${Math.floor(val.main.temp_min)}<span><i class="icon-celcius" style="font-size:25px;"></i></h3>
                         <p>${val.weather[0].description}</p>
        `
        sliderday.appendChild(box)

    })
}
function reformatdate(date) {
    const time = {
        month: "short",
        day: "numeric",
    };
    return date.toLocaleTimeString("GB", time);
}
function reformatday(day) {
    const myday = {
        weekday: "short",
    }
    return day.toLocaleDateString('en-us', myday)
}
//////////// section 1- fetch- city tehran//////////////
//////////// section 2- fetch- city name//////////////
const inpsearch = document.querySelector('.inpsearch')
const btnsearch = document.querySelector('.btnsearch')
const url = 'https://api.openweathermap.org/data/2.5/forecast?appid=dfbe068cb492a39f4026611208dc449e&units=metric&cnt=25&q='
async function getcity(city) {
    if (city) {
        const Ans = await fetch(url + city)
        const data = await Ans.json()
        if (data.cod == 200) {
            // console.log(data);
            tempcity[0].innerHTML = `${data.city.name}, ${data.city.country}`
            tempcity[1].firstElementChild.nextElementSibling.innerHTML = `${Math.floor(data.list[0].main.temp)}`
            tempcity[1].firstElementChild.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png">`
            tempcity[2].innerHTML = `${data.list[0].weather[0].description}`
            tempcity[3].innerHTML = `Updated as of ${reformatdate(mydate)} `
            tempcity[4].innerHTML = `Wind: ${data.list[0].wind.speed} km/h`
            tempcity[5].innerHTML = `Feels Like: ${data.list[0].main.feels_like}<i class="icon-celcius" style="font-size:25px;"></i>`
            tempcity[6].innerHTML = `Min: ${Math.floor(data.list[0].main.temp_min)}<i class="icon-celcius" style="font-size:25px;"></i>`
            ////////////////////////////////////
            data.list.map((val) => {
                // console.log(val);
                let day = new Date(val.dt_txt)
                let box = document.createElement('div')
                box.classList.add('swiper-slide')
                box.innerHTML = `
                        <h4>${reformatday(day)}</h4>
                        <h5>${reformatdate(day)}</h5>
                        <div><img src="https://openweathermap.org/img/wn/${val.weather[0].icon}.png"></div>
                         <h3>${Math.floor(val.main.temp)}<i class="icon-celcius" style="font-size:25px;"></i> <span>${Math.floor(val.main.temp_min)}<span><i class="icon-celcius" style="font-size:25px;"></i></h3>
                         <p>${val.weather[0].description}</p>
        `
                sliderday.appendChild(box)

            })
        }
        else {
            inpsearch.value = ''
            alert('City Is Not Found!!!')
        }
    }
}
/////////////// serach section ////////////////
btnsearch.addEventListener('click', () => {
    let myvalue = inpsearch.value
    if (myvalue) {
        getcity(myvalue)
        sliderday.innerHTML = ''
    }
})
/////////////// serach section ////////////////