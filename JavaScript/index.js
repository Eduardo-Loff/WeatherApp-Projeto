const btn = document.querySelector('#buscar'); 
const API_key = "e0f7a13a90a13a706871b97a0aae7b4e";
const API_url = "https://api.openweathermap.org/data/2.5/weather?q="+cidade+"&appid="+API_key+"&lang=pt_br";
const info = document.querySelector('.info')

// Variaveis 

btn.addEventListener("click", function(event){
    event.preventDefault();

    const cidade = document.querySelector('#cidade').value;

    console.log(cidade);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q="+cidade+"&appid="+API_key+"&units=metric&lang=pt_br");
    xmlhttp.send();
    xmlhttp.addEventListener("load", function() {
        var json = JSON.parse(xmlhttp.responseText);
        console.log(json);
        if (json.cod === 200){
            mostrarInfo({
                city: json.name,
                pais: json.sys.country,
                temp: json.main.temp,
                humidade: json.main.humidity,
                descricao: json.weather[0].description,
                icone: json.weather[0].icon,
                vento: json.wind.speed,
                max_temp: json.main.temp_max,
                min_temp: json.main.temp_min,
                
            })
        }else{
            showAlert('Local não encontrado')
        }
    })
    // Consulta API
})

function mostrarInfo(json){
    info.style.display = 'block';
    document.querySelector('#p1').innerHTML = `${json.city}, ${json.pais}`;
    document.querySelector('#icone').setAttribute('src', `https://openweathermap.org/img/wn/${json.icone}@2x.png`)
    document.querySelector('#temp').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')}°C`;
    document.querySelector('#descricao').innerHTML = `${json.descricao}`;
    document.querySelector('#vento').innerHTML = `<i class="bi bi-wind"></i> Velocidade do ar: ${json.vento} Km/h`;
    document.querySelector('#humidade').innerHTML = `<i class="bi bi-droplet-fill"></i> Umidade: ${json.humidade} %`;
    document.querySelector('#temp-max').innerHTML = `<i class="bi bi-thermometer-high"></i> Temp. Max: ${json.max_temp.toFixed(1).toString().replace('.',',')}°C`
    document.querySelector('#temp-min').innerHTML = `<i class="bi bi-thermometer-low"></i> Temp. Min: ${json.min_temp.toFixed(1).toString().replace('.',',')}°C`;
}