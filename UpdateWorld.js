function update() {
  if (activeAvatar.restart && activeAvatar.egg) {
    sideBar.setTexture("restartscreen");
  } else if (activeAvatar.egg) {
    sideBar.setTexture("eggscreen");
  } else if (activeAvatar.chicken) {
    sideBar.setTexture("chickenscreen");
  } else if (activeAvatar.raptor) {
    sideBar.setTexture("raptorscreen");
  } else if (activeAvatar.king) {
    sideBar.setTexture("kingscreen");
  }

  scoreText.setText(`${score}`);

  //egg
  if (activeAvatar.egg) {
    if (cursors.left.isDown) {
      eggPlayer.setVelocityX(-180);

      eggPlayer.anims.play("left", true);
      lastCursor = "left";
    } else if (cursors.right.isDown) {
      eggPlayer.setVelocityX(180);

      eggPlayer.anims.play("right", true);
      lastCursor = "right";
    } else if (lastCursor === "left") {
      eggPlayer.setVelocityX(0);

      eggPlayer.anims.play("staticLeft", true);
    } else if (lastCursor === "right") {
      eggPlayer.setVelocityX(0);

      eggPlayer.anims.play("staticRight", true);
    }

    if (cursors.up.isDown && eggPlayer.body.touching.down) {
      eggSound.play();
      eggPlayer.setVelocityY(-375);
    }
  }

  //bugs
  if (bugs) {
    bugs.children.iterate(function(bug) {
      if (bug.body.velocity.x >= 0) {
        bug.anims.play("rightbug", true);
      } else {
        bug.anims.play("leftbug", true);
      }
    });
  }
  //chicken
  if (activeAvatar.chicken) {
    if (cursors.left.isDown) {
      chickenPlayer.setVelocityX(-180);

      chickenPlayer.anims.play("chickleft", true);
      lastCursor = "left";
    } else if (cursors.right.isDown) {
      chickenPlayer.setVelocityX(180);

      chickenPlayer.anims.play("chickright", true);
      lastCursor = "right";
    } else if (cursors.space.isDown) {
      if (lastCursor === "right") {
        chickenPlayer.setVelocityX(520);
        chickenPlayer.anims.play("chickright", true);
      } else if (lastCursor === "left") {
        chickenPlayer.setVelocityX(-520);
        chickenPlayer.anims.play("chickleft", true);
      }
    } else if (lastCursor === "right") {
      chickenPlayer.setVelocityX(0);

      chickenPlayer.anims.play("chickStaticRight", true);
    } else if (lastCursor === "left") {
      chickenPlayer.setVelocityX(0);

      chickenPlayer.anims.play("chickStaticLeft", true);
    }

    if (cursors.up.isDown && chickenPlayer.body.touching.down) {
      chickenPlayer.setVelocityY(-400);
    }
  }
  //king
  if (activeAvatar.king) {
    if (cursors.left.isDown) {
      kingPlayer.setVelocityX(-180);

      kingPlayer.anims.play("kingleft", true);
      lastCursor = "left";
    } else if (cursors.right.isDown) {
      kingPlayer.setVelocityX(180);

      kingPlayer.anims.play("kingright", true);
      lastCursor = "right";
    } else if (cursors.space.isDown) {
      if (lastCursor === "left") {
        kingPlayer.setVelocityX(0);
        var cakeAmmo = cakes.create(kingPlayer.x, kingPlayer.y, "cake");
        cakeAmmo.setScale(1.0);
        cakeAmmo.setBounce(0);
        cakeAmmo.setCollideWorldBounds(true);
        cakeAmmo.setVelocityX(-200);
        setTimeout(() => {
          cakeAmmo.destroy();
        }, 1000);
      }
      if (lastCursor === "right") {
        kingPlayer.setVelocityX(0);
        var cakeAmmo = cakes.create(kingPlayer.x, kingPlayer.y, "cake");
        cakeAmmo.setScale(1.0);
        cakeAmmo.setBounce(0);

        cakeAmmo.setCollideWorldBounds(true);
        cakeAmmo.setVelocityX(200);
        setTimeout(() => {
          cakeAmmo.destroy();
        }, 1000);
      }
    } else if (lastCursor === "left") {
      kingPlayer.setVelocityX(0);

      kingPlayer.anims.play("kingleft", true);
    } else if (lastCursor === "right") {
      kingPlayer.setVelocityX(0);

      kingPlayer.anims.play("kingright", true);
    }

    if (cursors.up.isDown && kingPlayer.body.touching.down) {
      kingPlayer.setVelocityY(-400);
    }
  }

  // raptor
  if (activeAvatar.raptor) {
    if (cursors.left.isDown) {
      raptorPlayer.setVelocityX(-180);

      raptorPlayer.anims.play("raptorleft", true);
      lastCursor = "left";
    } else if (cursors.right.isDown) {
      raptorPlayer.setVelocityX(180);

      raptorPlayer.anims.play("raptorright", true);
      lastCursor = "right";
    } else if (cursors.space.isDown) {
      scream.play();
      if (lastCursor === "left") {
        raptorPlayer.setVelocityX(0);
        raptorPlayer.anims.play("roarleft", true);
        raptorPlayer.setVelocityX(-520);
        bugs.children.iterate(function(bug) {
          bug.setVelocityX(0);
        });
      }
      if (lastCursor === "right") {
        raptorPlayer.setVelocityX(0);
        raptorPlayer.anims.play("roarright", true);
        raptorPlayer.setVelocityX(520);
      }
      bugs.children.iterate(function(bug) {
        bug.setVelocityX(0);
      });
    } else if (lastCursor === "left") {
      raptorPlayer.setVelocityX(0);

      raptorPlayer.anims.play("raptorStaticLeft", true);
    } else if (lastCursor === "right") {
      raptorPlayer.setVelocityX(0);

      raptorPlayer.anims.play("raptorStaticRight", true);
    }

    if (cursors.up.isDown && raptorPlayer.body.touching.down) {
      raptorPlayer.setVelocityY(-400);
    }
  }

  this.physics.add.collider(eggPlayer, bugs, eggBugHit, null, this);

  function eggBugHit(eggPlayer, bug) {
    if (bug.body.touching.up) {
      squish.play();
      this.evoBarInterior.displayWidth += 25;
      score += 50;
      scoreText.setText(`${score}`);
      makeTokens();
      bug.destroy();
    } else if (
      bug.body.touching.left ||
      bug.body.touching.right ||
      bug.body.touching.down
    ) {
      levelDown.play();
      score -= 10;
      scoreText.setText(`${score}`);
      touchingObj = bug.body.touching;
      bugHurt(bug, eggPlayer, touchingObj);
    }

    if (this.evoBarInterior.displayWidth >= 457) {
      this.evoBarInterior.displayWidth = 0;
      activeAvatar.egg = false;
      activeAvatar.chicken = true;
      becomeChicken(eggPlayer);
      levelUp.play();
    }
  }

  function bugHurt(bug, player, touchingObj) {
    if (touchingObj.left) {
      bug.setVelocityX(190);
    } else if (touchingObj.right) {
      bug.setVelocityX(-190);
    } else if (touchingObj.down) {
      bug.setVelocityY(-300);
      setTimeout(() => {
        bug.setVelocityY(0);
      }, 1000);
    }
    levelDown.play();
    player.setTint(0xff0000);
    setTimeout(() => {
      player.clearTint();
    }, 1000);
    if (player.texture.key === "egg") {
      scene.evoBarInterior.displayWidth -= 10;
    } else if (player.texture.key === "chicken") {
      scene.evoBarInterior.displayWidth -= 15;
    } else if (player.texture.key === "raptor") {
      scene.evoBarInterior.displayWidth -= 20;
    } else if (player.texture.key === "king") {
      scene.evoBarInterior.displayWidth -= 22;
    }

    if (scene.evoBarInterior.displayWidth <= 0) {
      scene.evoBarInterior.displayWidth = 0;
    }
  }

  function becomeChicken(player) {
    player.setTexture("chicken");
    chickenPlayer.enableBody(true, eggPlayer.x, eggPlayer.y, true, true);
    eggPlayer.disableBody(true, true);
    scene.physics.add.collider(chickenPlayer, bugs, chickenBugHit, null, scene);
  }

  function chickenBugHit(chickenPlayer, bug) {
    if (bug.body.touching.up || cursors.space.isDown) {
      gobble.play();
      squish.play();
      this.evoBarInterior.displayWidth += 25;
      score += 50;
      scoreText.setText(`${score}`);
      makeTokens();
      bug.destroy();
    } else if (
      bug.body.touching.left ||
      bug.body.touching.right ||
      bug.body.touching.down
    ) {
      levelDown.play();
      touchingObj = bug.body.touching;
      bugHurt(bug, chickenPlayer, touchingObj);
      score -= 10;
      scoreText.setText(`${score}`);
    }

    if (this.evoBarInterior.displayWidth >= 457) {
      becomeRaptor(chickenPlayer);
      activeAvatar.chicken = false;
      activeAvatar.raptor = true;
      levelUp.play();
      this.evoBarInterior.displayWidth = 40;
    }
    if (this.evoBarInterior.displayWidth <= 0) {
      becomeEgg(chickenPlayer);
      this.evoBarInterior.displayWidth = 0;
      devolve.play();
    }
  }

  function becomeRaptor(chickenPlayer) {
    chickenPlayer.setTexture("raptor");
    raptorPlayer.enableBody(true, chickenPlayer.x, chickenPlayer.y, true, true);
    chickenPlayer.disableBody(true, true);
    scene.physics.add.collider(raptorPlayer, bugs, raptorBugHit, null, scene);
  }

  function raptorBugHit(raptorPlayer, bug) {
    if (bug.body.touching.up || cursors.space.isDown) {
      squish.play();
      this.evoBarInterior.displayWidth += 25;
      score += 50;
      scoreText.setText(`${score}`);
      bug.destroy();
      makeTokens();
    } else if (
      bug.body.touching.left ||
      bug.body.touching.right ||
      bug.body.touching.down
    ) {
      levelDown.play();
      touchingObj = bug.body.touching;
      bugHurt(bug, raptorPlayer, touchingObj);
      score -= 10;
      scoreText.setText(`${score}`);
    }
    if (this.evoBarInterior.displayWidth >= 457) {
      becomeKing(raptorPlayer);
      activeAvatar.raptor = false;
      activeAvatar.king = true;
      levelUp.play();
      this.evoBarInterior.displayWidth = 40;
    }
    if (this.evoBarInterior.displayWidth <= 0) {
      becomeEgg(raptorPlayer);
      this.evoBarInterior.displayWidth = 0;
      devolve.play();
    }
  }
  if (activeAvatar.egg) {
    correctUnderBottom(eggPlayer);
  }
  if (activeAvatar.chicken) {
    correctUnderBottom(chickenPlayer);
  }
  if (activeAvatar.raptor) {
    correctUnderBottom(raptorPlayer);
  }
  if (activeAvatar.king) {
    correctUnderBottom(kingPlayer);
  }

  function correctUnderBottom(player) {
    if (player.y >= 669 && player.texture.key != "raptor") {
      player.y = 661;
    }
  }

  function becomeKing(raptorPlayer) {
    //corrected the king falling through the floor when changing from raptor
    let y = raptorPlayer.y >= 669 ? 661.4 : raptorPlayer.y;
    kingPlayer.enableBody(true, raptorPlayer.x, y, true, true);
    raptorPlayer.setTexture("king");
    raptorPlayer.disableBody(true, true);
    scene.physics.add.collider(kingPlayer, bugs, kingBugHit, null, scene);
  }

  function kingBugHit(kingPlayer, bug) {
    if (bug.body.touching.up) {
      squish.play();
      this.evoBarInterior.displayWidth += 25;
      score += 50;
      scoreText.setText(`${score}`);
      bug.destroy();
      makeTokens();
    } else if (
      bug.body.touching.left ||
      bug.body.touching.right ||
      bug.body.touching.down
    ) {
      levelDown.play();
      touchingObj = bug.body.touching;
      bugHurt(bug, kingPlayer, touchingObj);
      score -= 10;
      scoreText.setText(`${score}`);
    }
    if (this.evoBarInterior.displayWidth >= 443) {
      this.evoBarInterior.displayWidth = 443;
    }
    if (this.evoBarInterior.displayWidth <= 0) {
      becomeEgg(kingPlayer);
      devolve.play();
    }
  }

  function becomeEgg(player) {
    player.setTexture("egg");
    eggPlayer.enableBody(true, player.x, player.y, true, true);
    player.disableBody(true, true);
    activeAvatar.restart = true;
    activeAvatar.egg = true;
    activeAvatar.king = false;
    activeAvatar.chicken = false;
    activeAvatar.raptor = false;
    scene.physics.add.collider(eggPlayer, bugs, eggBugHit, null, scene);
    setTimeout(() => {
      activeAvatar.restart = false;
    }, 10000);
  }

  this.physics.add.overlap(eggPlayer, binaryTokens, collectBinary, null, this);
  this.physics.add.overlap(
    chickenPlayer,
    binaryTokens,
    collectBinary,
    null,
    this
  );
  this.physics.add.overlap(
    raptorPlayer,
    binaryTokens,
    collectBinary,
    null,
    this
  );

  this.physics.add.overlap(kingPlayer, binaryTokens, collectBinary, null, this);
  scene.physics.add.collider(cakes, bugs, cakeBugHit, null, scene);
  scene.physics.add.collider(cakes, cloudPlatforms, cakeWallHit, null, scene);
  scene.physics.add.collider(cakes, gameBoundaries, cakeWallHit, null, scene);

  function cakeBugHit(cakeAmmo, bug) {
    this.evoBarInterior.displayWidth += 15;
    if (this.evoBarInterior.displayWidth >= 457) {
      this.evoBarInterior.displayWidth = 457;
    }
    cake.play();
    score += 50;
    scoreText.setText(`${score}`);
    cakeAmmo.destroy();
    bug.destroy();
    makeTokens();
  }

  function cakeWallHit(cakeAmmo, wall) {
    cakeAmmo.destroy();
  }

  function collectBinary(player, binaryTokens) {
    coins.play();
    binaryTokens.destroy();
    score += 100;
    scoreText.setText(`${score}`);
  }
}
