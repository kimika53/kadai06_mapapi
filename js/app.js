// map処理
let map;
let lat;
let lon;

function mapsInit(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    //Map表示
    map = new Bmap("#myMap");
    map.startMap(35.689610, 139.700562, "load", 16); 
    //Pinを追加
    let pin = map.pin(35.689610, 139.700562, "#rgb(233, 116, 7)");
    //Infoboxを追加
};

function mapsError(error) {
    let e = "";
    if (error.code == 1) {e = "位置情報が許可されてません";}
    if (error.code == 2) { e = "現在位置を特定できません";}
    if (error.code == 3) { e = "位置情報を取得する前にタイムアウトになりました";}
    alert("エラー：" + e);
};

const set = {
    enableHighAccuracy: true, //より高精度な位置を求める
    maximumAge: 20000, //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
    timeout: 10000 //10秒以内に現在地情報を取得できなければ、処理を終了
};

function GetMap() {
    navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
}

// library 処理
const libGrid = document.getElementById("lib-grid");
const save = document.getElementById("save");

const random_imgs = ["food1","food2","food3","food4","food5"];
const random_margin = ["-5px", "1px", "5px", "10px", "7px"];
const random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
let i = 0;

save.addEventListener("click", ()=> {
    
    // place 追加
    let place = document.createElement("div");
    let placeInfo = document.createElement("p");

    let shopName = document.getElementById("shop-name").value;
    let areaValue;
    let priceValue;
    let areas = document.getElementsByName('area');
    for (i = 0; i < areas.length; i++) {
        if (areas[i].checked) {
            areaValue = areas[i].value;
        }
        areas[i].checked = false;
    }
    let mealTimes = document.getElementsByName('meal-time');
    for (i = 0; i < mealTimes.length; i++) {
        if (mealTimes[i].checked) {
            mealTimeValue = mealTimes[i].value;
        }
        mealTimes[i].checked = false;
    }
    let prices = document.getElementsByName('price');
    for (i = 0; i < prices.length; i++) {
        if (prices[i].checked) {
            priceValue = prices[i].value;
        }
        prices[i].checked = false;
    }
    document.getElementById('shop-name').value="";
    
    // place 表示
    place.innerHTML = shopName + "<br>" ; 
    placeInfo.innerHTML = areaValue  + "<br>" + mealTimeValue + "<br>" + priceValue; 
    
    libGrid.appendChild(place);
    place.classList.add("place");
    place.appendChild(placeInfo);
    placeInfo.classList.add("placeInfo");
    
    place.setAttribute("style", `margin: ${random_margin[Math.floor(Math.random() * random_margin.length)]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);
    placeInfo.setAttribute("style", `background-image: url(css/${random_imgs[Math.floor(Math.random() * random_imgs.length)]}.png);background-position: bottom; background-repeat: no-repeat; background-size: contain;transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);
    
});


