export default function companyController () {

    const db = [
        {
            id: 1,
            name: "G.Bar",
            website: "https://gbar.com.ua/",
            locations: ["Vulytsya Zarichna, 1в, Kyiv, Ukraine"],
            services: [
                "hair",
                "nails",
                "spa",
                "makeup"
            ],
            workingHours: "0 10-18 * * Mon-Fri *" 
        },
        {
            id: 2,
            name: "The girls",
            website: "https://thegirls.com.ua/",
            locations: ["Horyva street, 41, Kyiv, Ukraine", "Heroiv Stalingrada avenue, 12ж, Kyiv, Ukraine"],
            services: [
                "haircut",
                "manicure",
                "makeup"
            ],
            workingHours: "0 8-20 * * Mon-Sun *" 
        },
        {
            id: 3,
            name: "Beauty lab MV",
            localtions: ["Yelyzavety Chavdar St, 13, Kyiv, Ukraine"],
            services: [
                "haircut"
            ],
            workingHours: "0 10-18 * * Mon-Sun *" 
        },
    ];

    let get = function(req, resp, next){
        const id = req.params.id;
        return db.find(x => x.id == id);
    };

    let create = function(req, resp, next){
        throw new Error('Method not implemented');
    };

    let remove = function(req, resp, next){
        const id = req.params.id;
        let idx = db.findIndex(x => x.id == id);
        db.splice(idx, idx);
    };

    let list = function(req, resp, next){
        return db;
    };

    let resposeWriter = function(action, req, resp, next){
        var data = action(req, resp);
        resp
            .status(200)
            .json({
                success: true,
                data: data
            });
        next();
    } 

    return {
        get: (...args) => resposeWriter(get, ...args),
        create: (...args) => resposeWriter(create, ...args),
        delete: (...args) => resposeWriter(remove, ...args),
        list: (...args) => resposeWriter(list, ...args)
    };

};
