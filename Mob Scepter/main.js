/*
Author:Wudasha
Version:0.1
If you have better ideas or resources, you can give me feedback, 
I will take these suggestions and write your name in the Git thank you list.
Email: 1467847035@qq.com
VK:https://vk.com/id589636699
*/
//Core
var McMath = {
	rtd(rotation, dgr) {
		return Math.floor(rotation * (dgr / Math.PI));
	},
	dtr(dgr) {
		return dgr * (Math.PI / 180);
	},
	getYaw(r) {
		var yawRTD = this.rtd(r, 180);
		var yaw = 0;
		yaw = yawRTD % 360;
		yaw = (yaw + 360) % 360;
		return yaw;
	},
	lookDirection(yaw, pitch) {
		return {
			x: -Math.sin(yaw) * Math.cos(pitch),
			y: Math.sin(pitch),
			z: Math.cos(yaw) * Math.cos(pitch)
        }
    }
};

//Blank Scepter
IDRegistry.genItemID("blankScepter");
Item.createItem("blankScepter", "Blank Scepter", {name: "blankScepter", meta: 0}, {stack: 1});

Callback.addCallback("EntityDeath", function(entity, attacker){
    if(!Player.isPlayer(attacker)){
        return;
    }
    const entityType = Entity.getType(entity),
    item = Player.getCarriedItem();
    if (item.id == ItemID.blankScepter){
        if (entityType == 46){
            Player.decreaseCarriedItem (1);
            Player.setCarriedItem (ItemID.skeletonScepter, 1, 0);
        }else if (entityType == 104){
            Player.decreaseCarriedItem (1);
            Player.setCarriedItem (ItemID.evokerScepter, 1, 0);
        }else if (entityType == 54){
            Player.decreaseCarriedItem (1);
            Player.setCarriedItem (ItemID.shulkerScepter, 1, 0);
        }else if (entityType == 48){
            Player.decreaseCarriedItem (1);
            Player.setCarriedItem (ItemID.witherSkeletonScepter, 1, 0);
        }else if (entityType == 38){
            Player.decreaseCarriedItem (1);
            Player.setCarriedItem (ItemID.endermanScepter, 1, 0);
        }
    }
});

Recipes.addShaped ({id: ItemID.blankScepter, count: 1, data: 0}, [

     "x  ",

     " a ",

     "  x"

], ['x', 57, 0, 'a', 280, 0]);

//Skeleton Scepter
IDRegistry.genItemID("skeletonScepter");
Item.createItem("skeletonScepter", "Skeleton Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7Generate a falling arrow 5*5 \nin the surrounding non-player area") + Translation.translate("\n§fMethod of obtaining:") + Translation.translate("\n§7Use Blank Scepter to destroy the Monster \nSpawner of the corresponding Mob or kill the \ncorresponding Mob"), {name: "skeletonScepter", meta: 0}, {stack: 1});
Item.setMaxDamage("skeletonScepter", 300);
Item.setToolRender("skeletonScepter", true);

Callback.addCallback("ItemUse", function(coords, item, block){
    var lookAngle, v, c, entity;
    for(i = 0; i < 5; i++){
        if(item.id == ItemID.skeletonScepter){
        lookAngle = Entity.getLookAngle(Player.get());
        v = McMath.lookDirection(lookAngle.yaw, lookAngle.pitch);
        c = Entity.getPosition(Player.get()),
        entity = Entity.spawn(c.x + (v.x * .12), c.y + (v.y * .12), c.z + (v.z * .12), 80);
        Entity.setVelocity(entity, v.x * 1, v.y * 1 - 0.2, v.z * 1);
        }
    }
/*    Threading.getThread ("UseSkeletonScepter");*/
});

//Evoker Scepter
IDRegistry.genItemID("evokerScepter");
Item.createItem("evokerScepter", "Evoker Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7Generate a 5*5 Evoker Fangs \nin front of the player") + Translation.translate("\n§fMethod of obtaining:") + Translation.translate("\n§7\n§7Use Blank Scepter tokill the \ncorresponding Mob"), {name: "evokerScepter", meta: 0}, {stack: 1});
Item.setMaxDamage("evokerScepter", 300);
Item.setToolRender("evokerScepter", true);

Callback.addCallback("ItemUse", function(coords, item, block){
    if(item.id == ItemID.skeletonScepter){
        var playerCoords = Player.getPosition();
        var coordsX = playerCoords.x-2,
            coordsZ = playerCoords.z-2;
        for (coordsX - 2; coordsX<= playerCoords.x + 2; coordsX++){
            for (coordsZ - 2; coordsZ <= Player.getPosition.z + 2; coordsZ++){
                if (coordsX != Player.getPosition.x && coordsZcoordsZ != Player.getPosition.z){
                    Entity.spawn(x, y-1, z, 103);
                }
            }
        }
    }
});

//Electrified Creeper
IDRegistry.genItemID("electrifiedCreeperScepter");
Item.createItem("electrifiedCreeperScepter", "Electrified Creeper Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7Lightning is generated at the player's \nlong-pressed block or Mob attack"), {name: "electrifiedCreeper", meta: 0}, {stack: 1});
Item.setMaxDamage("electrifiedCreeperScepter", 300);
Item.setToolRender("electrifiedCreeperScepter", true);

Callback.addCallback("ItemUse", function(coords, item, block){
    if (item.id==ItemID.electrifiedCreeperScepter){
        Entity.spawn(coords.x, coords.y+1, coords.z, 93);
}
});

Recipes.addShaped ({id: ItemID.electrifiedCreeperScepter, count: 1, data: 0}, [

     "",

     "xa",

     ""

], ['x', ItemID.blankScepter, 0, 'a', 397, 4]);

//Shulker Scepter
IDRegistry.genItemID("shulkerScepter");
Item.createItem("shulkerScepter", "Shulker Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7Launch Shulker Bullet") + Translation.translate("\n§fMethod of obtaining:") + Translation.translate("\n§7Use Blank Scepter to destroy the Monster \nSpawner of the corresponding Mob or kill the \ncorresponding Mob"), {name: "shulkerScepter", meta: 0}, {stack: 1});
Item.setMaxDamage("shulkerScepter", 300);
Item.setToolRender("shulkerScepter", true);

Callback.addCallback("ItemUse", function(coords, item, block){
    var lookAngle, v, c, entity;
    if(item.id==ItemID.shulkerScepter){
        lookAngle = Entity.getLookAngle(Player.get());
        v = McMath.lookDirection(lookAngle.yaw, lookAngle.pitch);
        c = Entity.getPosition(Player.get());
        entity = Entity.spawn(c.x, c.y+1, c.z, 76);
        Entity.setVelocity(entity, v.x * 3, v.y * 3 - 0.1, v.z * 1);
    }
});

//Wither Skeleton Scepter
IDRegistry.genItemID("witherSkeletonScepter");
Item.createItem("witherSkeletonScepter", "Wither Skeleton Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7The attacked Mob gains the \nWither effect for five minutes") + Translation.translate("\n§fMethod of obtaining:") + Translation.translate("\n§7Use Blank Scepter to destroy the Monster \nSpawner of the corresponding Mob or kill the \ncorresponding Mob"), {name: "witherSkeletonScepter", meta: 0}, {stack: 1});
Item.setMaxDamage("witherSkeletonScepter", 300);
Item.setToolRender("witherSkeletonScepter", true);

Callback.addCallback("PlayerAttack", function(player, victim){
    Entity.addEffect(victim, 20, 2, 600);
});

//Wither Scepter
IDRegistry.genItemID("witherScepter");
Item.createItem("witherScepter", "Wither Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7Throw the Wither Skull"), {name: "witherScepter", meta: 0}, {stack: 1});
Item.setMaxDamage("witherScepter", 200);
Item.setToolRender("witherScepter", true);

Callback.addCallback("ItemUse", function(coords, item, block){
    if(item.id==ItemID.witherScepter){
        var lookAngle = Entity.getLookAngle(Player.get()),
        v = McMath.lookDirection(lookAngle.yaw, lookAngle.pitch),
        c = Entity.getPosition(Player.get()),
        entity = Entity.spawn(c.x, c.y+1, c.z, 89);
        Entity.setVelocity(entity, v.x * 1, v.y * 1 - 0.2, v.z * 1);
    }
});

Recipes.addShaped ({id: ItemID.witherScepter, count: 1, data: 0}, [

     "",

     "xa",

     ""

], ['x', ItemID.blankScepter, 0, 'a', 399, 0]);

//Enderman Scepter
IDRegistry.genItemID("endermanScepter");
Item.createItem("endermanScepter", "Enderman Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7Throwing Eye of Ender") + Translation.translate("\n§fMethod of obtaining:") + Translation.translate("\n§7Use Blank Scepter to destroy the Monster \nSpawner of the corresponding Mob or kill the \ncorresponding Mob"), {name: "endermanScepter", meta: 0}, {stack: 1});
Item.setMaxDamage("endermanScepter", 300);
Item.setToolRender("endermanScepter", true);

Callback.addCallback("ItemUse", function(coords, item, block){
    if(item.id==ItemID.endermanScepter){
        var lookAngle = Entity.getLookAngle(Player.get()),
        v = McMath.lookDirection(lookAngle.yaw, lookAngle.pitch),
        c = Entity.getPosition(Player.get()),
        entity = Entity.spawn(c.x, c.y+1, c.z, 87);
        Entity.setVelocity(entity, v.x * 1, v.y * 1 - 0.2, v.z * 1);
    }
});

//Ender Dragon Scepter
IDRegistry.genItemID("enderDragonScepter");
Item.createItem("enderDragonScepter", "Ender Dragon Scepter" + Translation.translate("\nUse:") + Translation.translate("\n§7Throw Dragon Fireball"), {name: "enderDragonScepter", meta: 0}, {stack: 1});
Item.setMaxDamage("enderDragonScepter", 200);
Item.setToolRender("enderDragonScepter", true);

Callback.addCallback("ItemUse", function(coords, item, block){
    if(item.id==ItemID.enderDragonScepter){
        var lookAngle = Entity.getLookAngle(Player.get()),
        v = McMath.lookDirection(lookAngle.yaw, lookAngle.pitch),
        c = Entity.getPosition(Player.get()),
        entity = Entity.spawn(c.x, c.y+1, c.z, 79);
        Entity.setVelocity(entity, v.x * 1, v.y * 1 - 0.2, v.z * 1);
    }
});

Recipes.addShaped ({id: ItemID.enderDragonScepter, count: 1, data: 0}, [

     "",

     "xa",

     ""

], ['x', ItemID.blankScepter, 0, 'a', 122, 0]);