// var jsonData;
//  function info(data){
//    jsonData= JSON.parse(data);
//    return jsonData;
// };

function stockJump(symbol) {
  this.symbol = symbol;
}

stockJump.prototype.getQuote = function(){
  var symbol = this.symbol;
  $.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+symbol+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').then(function(respond){
    var jsonData=respond.query.results.quote;

    console.log(jsonData);
      $("#show").html(
        "<div class='container'>"+
          "<div class='row border'>"+
            "<h3 class='title'>Stock Quote</h3>"+
            "<div class='col-md-7 col-border'>"+
              "<div class='row col-border'>"+
                "<div class='col-xs-6 col-border'>"+
                  "<h4>"+ jsonData.Name +"<span style='font-size: 14px'>"+ " ("+jsonData.Symbol+")</span></h4>"+
                  "<p style='font-size: 15px'>on "+ jsonData.StockExchange+"</p>"+
                  "<h3>"+jsonData.Bid+jsonData.Currency+"</h3>"+
                  "<p style='font-size: 10px'>"+jsonData.LastTradeDate+"</p>"+
                "</div>"+
                "<div class='col-xs-6 col-border'>"+
                  "<h5>Change(%chg)</h5>"+
                  "<h3>$"+jsonData.Change+"<span style='font-size: 12px; color:"+ "green;'>("+jsonData.PercentChange+")</span></h3>"+
                "</div>"+
              "</div>"+
              "<hr>"+
              "<div class='row col-border'>"+
                "<div class='col-xs-3 col-s-3 col-border'>"+
                  "<h5>Prev Close</h5>"+
                  "<h5>"+jsonData.PreviousClose+"</h5>"+
                  "<hr>"+
                  "<h5>Open</h5>"+
                  "<h5>$"+jsonData.Open+"</h5>"+
                "</div>"+
                "<div class='col-xs-3 col-s-3 col-border'>"+
                  "<h5>Day's High</h5>"+
                  "<h5 style='color: green;'>$"+jsonData.DaysHigh+"</h5>"+
                  "<hr>"+
                  "<h5>Day's Low</h5>"+
                  "<h5 style='color: red;'>$"+jsonData.DaysLow+"</h5>"+
                "</div>"+
                "<div class='col-xs-3 col-s-3 hello'>"+
                  "<h5>Volume</h5>"+
                  "<h5>"+jsonData.Volume+"</h5>"+
                  "<hr>"+
                  "<h5>Avg. Volume</h5>"+
                  "<h5>"+jsonData.AverageDailyVolume+"</h5>"+
                "</div>"+
                "<div class='col-xs-3 col-s-3 hello'>"+
                  "<h5>Year High</h5>"+
                  "<h5 style='color: green;'>$"+jsonData.YearHigh+"</h5>"+
                  "<hr>"+
                  "<h5>Year Low</h5>"+
                  "<h5 style='color: red'> $"+jsonData.YearLow+"</h5>"+
                "</div>"+
              "</div>"+
              "<hr>"+
              "<div class='row hello'>"+
                "<div class='col-xs-3 col-s-3 hello'>"+
                  "<h5>(P/B) Ratio</h5>"+
                  "<h5>"+jsonData.PriceBook+"</h5>"+
                "</div>"+
                "<div class='col-xs-3 col-s-3 hello'>"+
                  "<h5>(P/E) Ratio</h5>"+
                  "<h5>"+jsonData.PERatio+"</h5>"+
                "</div>"+
                "<div class='col-xs-3 col-s-3 hello'>"+
                  "<h5>PEG Ratio</h5>"+
                  "<h5>"+jsonData.PEGRation+"</h5>"+
                "</div>"+
                "<div class='col-xs-3 col-s-3 hello'>"+
                  "<h5>Dividend Yield</h5>"+
                  "<h5>"+jsonData.DividendYield+"%</h5>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"
      );
  }).fail(function(error){
    alert("didnt work");
  });

};


$(document).ready(function(){
  $("#results").submit(function(event){
    event.preventDefault();
    var symbol = $("#stock").val();
    var result = new stockJump(symbol);
    result.getQuote();


  });
});
