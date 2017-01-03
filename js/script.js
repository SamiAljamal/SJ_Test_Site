
function stockJump(symbol) {
  this.symbol = symbol;
}

function drawTable(rows){

  var cssClassNames = {
'headerRow': 'italic-darkblue-font large-font bold-font',
'tableRow': '',
'oddTableRow': 'beige-background',
'selectedTableRow': 'orange-background large-font',
'hoverTableRow': '',
'headerCell': 'gold-border',
'tableCell': '',
'rowNumberCell': 'underline-blue-font'};

  var data= new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Target Co.');
  data.addColumn('string', 'Release Date');
  data.addColumn('string', 'Reporting Time');
  data.addColumn('string', 'Direction Call');
  data.addColumn('string', 'Actual Move');
  data.addColumn('number', 'Jumpzone');
  data.addColumn('string', 'Win or Loss');
  data.addColumn('number', '5-5 strategy');
  var name, target, releaseDate, reportingTime, directionCall,actualMove, jumpZone,winLoss,fiveFiveStrategy;

  for (var i=0; i<rows.length; i++){
    name=rows[i].name;
    target=rows[i]['targetco.']
    releaseDate=rows[i].releasedate;
    reportingTime=rows[i].reportingtime;
    directionCall=rows[i].directioncall;
    actualMove= rows[i].actualmove;
    jumpzone= parseFloat(rows[i].jumpzone);
    winLoss = rows[i].winorloss;
    fiveFiveStrategy= parseFloat(rows[i].strategy);

    data.addRows([[name,target,releaseDate,reportingTime,directionCall,actualMove,jumpzone,winLoss,fiveFiveStrategy]]);
  }

  var chart= new google.visualization.Table(document.getElementById('table'));
  chart.draw(data,{ showRowNumber: true, width: '100%', height: '100%', 'cssClassNames': cssClassNames });

}
function stockTable(){
  $.get('https://spreadsheets.google.com/feeds/list/1Commwsbv0d5qnJsoWfo_ln_myg8Ra_91Ud62xJRLxV4/1/public/basic?alt=json').then(function(respond){
    var rows=[];
    var cells = respond.feed.entry;

    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.name = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }
    drawTable(rows);

  }).fail(function(){
  })
}
stockJump.prototype.getQuote = function(){
  var symbol = this.symbol;
  $.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+symbol+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').then(function(respond){
    var jsonData=respond.query.results.quote;
    console.log(jsonData);
      $("#stockquote").html(
        '<div class="row">'+
          '<div class="col-xs-6">'+
            "<h4>"+jsonData.Name+"<span style='font-size: 14px'>("+jsonData.Symbol+")</span></h4>"+
            "<p style='font-size: 15px'>"+jsonData.StockExchange+"</p>"+
            "<h3>"+jsonData.Bid+jsonData.Currency+"</h3>"+
            "<p style='font-size: 10px'>"+jsonData.LastTradeDate+"</p>"+
          "</div>"+
          '<div class="col-xs-6">'+
            "<h5>Change(%chg)</h5>"+
             "<h3>$"+jsonData.Change+"<span style='font-size: 12px; color:"+ "green;'>("+jsonData.PercentChange+")</span></h3>"+
          "</div>"+
        "</div>"+
        "<hr class='hrquote'>"+
        '<div class="row">'+
          '<div class="col-xs-3">'+
            "<h5>Prev Close</h5>"+
            "<h5>"+jsonData.PreviousClose+"</h5>"+
            "<hr class='hrquote'>"+
            "<h5>Open</h5>"+
            "<h5>$"+jsonData.Open+"</h5>"+
          "</div>"+
          '<div class="col-xs-3">'+
            "<h5>Day's High</h5>"+
            "<h5 style='color: green;'>$"+jsonData.DaysHigh+"</h5>"+
            "<hr class='hrquote'>"+
            "<h5>Day's Low</h5>"+
            "<h5 style='color: red;'>$"+jsonData.DaysLow+"</h5>"+
          "</div>"+
          '<div class="col-xs-3">'+
            "<h5>Volume</h5>"+
            "<h5>"+jsonData.Volume+"</h5>"+
            "<hr class='hrquote'>"+
            "<h5>Avg. Volume</h5>"+
            "<h5>"+jsonData.AverageDailyVolume+"</h5>"+
          "</div>"+
          '<div class="col-xs-3">'+
            "<h5>Year High</h5>"+
           "<h5 style='color: green;'>$"+jsonData.YearHigh+"</h5>"+
           "<hr class='hrquote'>"+
           "<h5>Year Low</h5>"+
           "<h5 style='color: red'> $"+jsonData.YearLow+"</h5>"+
          "</div>"+
        "</div>"+
        "<hr class='hrquote'>"+
        "<div class='row'>"+
          "<div class='col-xs-3'>"+
            "<h5>(P/B) Ratio</h5>"+
            "<h5>"+jsonData.PriceBook+"</h5>"+
          "</div>"+
          "<div class='col-xs-3'>"+
            "<h5>(P/E) Ratio</h5>"+
            "<h5>"+jsonData.PERatio+"</h5>"+
          "</div>"+
          "<div class='col-xs-3'>"+
            "<h5>PEG Ratio</h5>"+
            "<h5>"+jsonData.PEGRation+"</h5>"+
          "</div>"+
          "<div class='col-xs-3'>"+
            "<h5>DY</h5>"+
            "<h5>"+jsonData.DividendYield+"%</h5>"+
          "</div>"+
        "</div>");
  }).fail(function(error){
    alert("didnt work");
  });

};

stockJump.prototype.getNews = function(){
  var symbol = this.symbol;
  $.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%27http%3A%2F%2Ffeeds.finance.yahoo.com%2Frss%2F%2F2.0%2Fheadline%3Fs%3D'+ symbol +'%26region%3DUS%26lang%3Den-US%27&format=json&diagnostics=true&callback=').then(function(respond){
    var jsonData= respond.query.results.item;
    jsonData.forEach(function(list){
      $("#news").append("<p><a href='"+list.link+"'>"+list.title+"</a></p>")
    });

  }).fail(function(error){
    alert("didnt work");
  })
}


$(document).ready(function(){
  google.charts.load('current', {'packages':['table']});
  stockTable();
  $("#results").submit(function(event){
    event.preventDefault();
    var symbol = $("#stock").val();
    var result = new stockJump(symbol);
    result.getQuote();
    result.getNews();
    $(".message").show();
    $("#list").show();
    $("#news").empty();



  });
});
