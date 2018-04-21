class Schedule {
    constructor(public days : Array<DaySchedule>) {

    }
}

class DaySchedule {
    
    constructor(public day : Date, public blocks : Array<Block>) {
        
    }
}

class Block {
    constructor(public start: Date, public end: Date, public items: Array<BlockItem>) {
        
    }
}

class BlockItem {
    constructor(public location: String, public description: String, public host?: Host, public image?: URL) {
        
    }
}

class Host {
    constructor(public image: URL, public name: String, public description: String) {

    }
}