var casinoBanditModule = (
  function () {
      return {
          PageLoad: function () {
              $("#casino-bandit-lever").on('click', function () {
                  casinoBanditModule.PullTheLever();
              });

              $("#casino-bandit-reset-button").on('click', function () {
                  casinoBanditModule.Reset();
              });

              this.playerBank = 100;
              this.betAmount = 0;
              this.repeatRandomFruits = false;
              this.repeatTime = 100;

              this.images = [
                "Bar.png", "Bell.png", "Cherry.png", "Clover.png", "Diamond.png", "HorseShoe.png",
                "Lemon.png", "Orange.png", "Plum.png", "Seven.png", "Strawberry.png", "Watermelon.png",
              ];

              casinoBanditModule.Reset();
          },
          CheckCombinations: function () {
              //One bar - win nothing
              if ($("#reel1").attr("src").toUpperCase().includes("BAR") || $("#reel2").attr("src").toUpperCase().includes("BAR") ||
                $("#reel3").attr("src").toUpperCase().includes("BAR")) {
                  casinoBanditModule.OneBar();
              }
              //Three Sevens - 100xbet
              else if ($("#reel1").attr("src").toUpperCase().includes("SEVEN") && $("#reel2").attr("src").toUpperCase().includes("SEVEN") &&
                $("#reel3").attr("src").toUpperCase().includes("SEVEN")) {
                  casinoBanditModule.ThreeSevens();
              }
              //Three Cherries - win 4xbet
              else if ($("#reel1").attr("src").toUpperCase().includes("CHERRY") && $("#reel2").attr("src").toUpperCase().includes("CHERRY") &&
                $("#reel3").attr("src").toUpperCase().includes("CHERRY")) {
                  casinoBanditModule.ThreeCherries();
              }
              //Two Cherries - win 3xbet
              else if ($("#reel1").attr("src").toUpperCase().includes("CHERRY") && $("#reel2").attr("src").toUpperCase().includes("CHERRY") ||
              $("#reel1").attr("src").toUpperCase().includes("CHERRY") && $("#reel3").attr("src").toUpperCase().includes("CHERRY") ||
              $("#reel2").attr("src").toUpperCase().includes("CHERRY") && $("#reel3").attr("src").toUpperCase().includes("CHERRY")) {
                  casinoBanditModule.TwoCherries();
              }
              //One Cherry - win 2xbet
              else if ($("#reel1").attr("src").toUpperCase().includes("CHERRY") || $("#reel2").attr("src").toUpperCase().includes("CHERRY") ||
                  $("#reel3").attr("src").toUpperCase().includes("CHERRY")) {
                  casinoBanditModule.OneCherry();
              }

              $("#player-bank").html("Player's Money: " + this.playerBank + ".00");
          },
          ClearTextBox: function () {
              $("#bet-box").val("")
          },
          DisplayRandomFruits: function () {

              if (!this.repeatRandomFruits) {
                  return;
              }

              casinoBanditModule.GenerateRandomImages();
              setTimeout(function () {
                  casinoBanditModule.DisplayRandomFruits()
              }, this.repeatTime);
          },
          GenerateRandomImage: function (reel) {
              var imageString = "ReelImages/" + this.images[Math.round(Math.random() * (11))];
              $(reel).attr("src", imageString)
          },
          GenerateRandomImages: function () {

              casinoBanditModule.GenerateRandomImage("#reel1");
              casinoBanditModule.GenerateRandomImage("#reel2");
              casinoBanditModule.GenerateRandomImage("#reel3");
          },
          OneBar: function () {
              $("#bet-string").html("You bet: " + this.betAmount + ".00 and won nothing!");
          },
          OneCherry: function () {
              $("#bet-string").html("You bet: " + this.betAmount + ".00" + " and won " + (2 * this.betAmount) + ".00!");
              this.playerBank += 2 * this.betAmount;
          },
          PullTheLever: function () {
              if (this.playerBank <= 0) {
                  alert("Bankrupt! :(");
                  casinoBanditModule.ClearTextBox();
                  return;
              }

              $("#casino-bandit-lever").hide();

              var betString = $("#bet-box").val();

              this.betAmount = parseInt(betString);

              if (this.betAmount === "" || isNaN(this.betAmount)) {
                  $("#bet-string").html("Not a valid input...");
                  $("#casino-bandit-lever").show();
                  return;
              }

              if (this.betAmount > this.playerBank) {
                  $("#bet-string").html("Amount must be less than you have...");
                  $("#casino-bandit-lever").show();
                  return;
              }

              casinoBanditModule.repeatRandomFruits = false;

              $("#bet-string").html("Spinning reels...");

              if (this.playerBank <= 0) {
                  alert("Bankrupt! :(");
                  casinoBanditModule.ClearTextBox();
                  return;
              }

              this.displayRandomFruits = false;

              if (!isNaN(this.betAmount)) {

                  casinoBanditModule.playerBank -= casinoBanditModule.betAmount;
                  $("#bet-string").html("You bet: " + casinoBanditModule.betAmount + ".00");
                  $("#player-bank").html("Player's Money: " + casinoBanditModule.playerBank + ".00");
                  casinoBanditModule.GenerateRandomImages();

                  casinoBanditModule.CheckCombinations();
                  $("#casino-bandit-lever").show();
                  $("#player-bank").html("Player's Money: " + casinoBanditModule.playerBank + ".00");
              }
          },
          Reset: function () {
              this.repeatRandomFruits = true;
              this.repeatTime = 100;
              this.playerBank = 100;
              this.betAmount = 0;
              $("#player-bank").html("Player's Money: " + this.playerBank + ".00");
              $("#bet-string").html("<br>");
              casinoBanditModule.ClearTextBox();
              casinoBanditModule.DisplayRandomFruits();
          },
          ThreeCherries: function () {
              $("#bet-string").html("You bet: " + this.betAmount + ".00" +
                " and won " + (4 * this.betAmount) + ".00!");
              this.playerBank += 4 * this.betAmount;
          },
          ThreeSevens: function () {
              $("#bet-string").html("You bet: " + betAmount + ".00" +
                " and won " + (100 * betAmount) + ".00 - JACKPOT!!");
              this.playerBank += 100 * this.betAmount;
          },
          TwoCherries: function () {
              $("#bet-string").html("You bet: " + this.betAmount + ".00" +
                " and won " + (3 * this.betAmount) + ".00!");
              this.playerBank += 3 * this.betAmount;
          },
      }
  })();

casinoBanditModule.PageLoad();