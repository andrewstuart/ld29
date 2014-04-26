'use strict';

angular.module('underDarknessApp')
  .controller('MainCtrl', function ($scope, $http) {

    var game = new Phaser.Game(1200, 700, Phaser.AUTO, null, {preload: preload, create: create, update: update});

    function preload () {
      game.load.image('grid', 'images/Grid.png');
      game.load.spritesheet('nito', 'images/player.png', 48, 48);
    }

    var player;
    var cursors;
    var wasd = {};

    function create () {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      //game.add.sprite(0,0,'grid');
      game.stage.backgroundColor = 'EEEEEE';

      player = game.add.sprite(0,0,'nito');
      player.animations.add('move', [0,1], 10, true);

      game.physics.arcade.enable(player);

      //player.body.gravity.y = 300;
      player.body.bounce.y = 0.10;
      player.body.collideWorldBounds = true;

      cursors = game.input.keyboard.createCursorKeys();

      _.each(['w', 'a', 's', 'd'], function(key) {
        wasd[key] = game.input.keyboard.addKey(Phaser.Keyboard[key.toUpperCase()]);
      });
    }

    $scope.defaultVelocity = 150;

    function update () {
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;

      if(wasd.a.isDown) {
        player.body.velocity.x -= $scope.defaultVelocity;
      }
      if(wasd.d.isDown) {
        player.body.velocity.x += $scope.defaultVelocity;
      }
      if(wasd.w.isDown) {
        player.body.velocity.y -= $scope.defaultVelocity;
      }
      if(wasd.s.isDown) {
        player.body.velocity.y += $scope.defaultVelocity;
      }

      if(cursors.left.isDown) {
        player.body.velocity.x -= $scope.defaultVelocity;
      }
      if (cursors.right.isDown) {
        player.body.velocity.x += $scope.defaultVelocity;
      }
      if(cursors.up.isDown) {
        player.body.velocity.y -= $scope.defaultVelocity;
      }
      if(cursors.down.isDown) {
        player.body.velocity.y += $scope.defaultVelocity;
      }

      if(player.body.velocity.x || player.body.velocity.y) {
        player.animations.play('move');
      } else {
        player.animations.stop();
      }

    }
  });

