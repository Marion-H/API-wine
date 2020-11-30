
const WineStore = require("../models/WineStore")

const createWinestore = async (store, saveWine, res) => {
    if (store !== null) {
        const infoWineStore = {
            WineUuid: saveWine.uuid,
            StoreUuid: store.uuid
        }
        const saveWineStore = await WineStore.create(infoWineStore)
    } else {
        res.status(404).json({
            status: "error",
            message: "store uuid not found"
        });
    }
}

module.exports = createWinestore