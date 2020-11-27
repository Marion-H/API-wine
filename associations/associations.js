const Wine = require("../models/Wine")
const Store = require("../models/Store")
const WineStore = require("../models/WineStore")


Wine.belongsToMany(Store, { through: WineStore, as: "stores", foreignKey: "WineUuid", otherKey: "StoreUuid"})

Store.belongsToMany(Wine, { through: WineStore, as: "wines", foreignKey: "StoreUuid", otherKey: "WineUuid" })

// WineStore.belongsTo(Store)

// WineStore.belongsTo(Wine)

// Promise.all([Store.create(), Wine.create()])
//     .then(([wine, store]) => WineStore.create({WineUuid: wine.uuid, StoreUuid: store.uuid}))



