(function () {


    adTemplate = {
        id: "",
        description: "",
        createdAt: new Date("2021-02-01T23:00:00"),
        link: "",
        vendor: "",
        photoLink: "", //not necessary
        hashTags: ["tag1", "tag2"],
        discount: "",
        validUntill: new Date("2021-05-01"),
        rating: 0, // not necassery
        reviews: [] //not necassary
    }


    class AdCollection {

        constructor(adList) {
            this._ads = []
            adList.forEach(el => {
                if (AdCollection.validateAd(el) && this._validID(el.id)) {
                    this._ads.push(el);
                }
            });
        }

        static validateAd(ad) {
            var valid = true;
            for (var key in ad) {
                if (!(adTemplate.hasOwnProperty(key) && (typeof adTemplate[key] === typeof ad[key]))) {
                    valid = false;
                    break;
                }
            }
            return valid;
        }

        _validID(id) {
            var indexOfItem = this._ads.find(function (i) {
                return i.id === id;
            });

            if (indexOfItem === undefined) {
                return true;
            } else {
                return false;
            }
        }

        addAd(obj) {
            var success = false;
            if (AdCollection.validateAd(obj) && this._validID(obj.id)) {
                this._ads.push(obj);
                success = true;
            }
            return success;
        }

        addAll(adList) {
            var invalid = [];
            adList.forEach(el => {
                if (AdCollection.validateAd(el) && this._validID(el)) {
                    this._ads.push(el);
                } else {
                    invalid.push(el);
                }
            });
            return invalid;
        }

        getAd(id) {
            return this._ads.find(item => {
                return item.id === id;
            })
        }

        getPage(skip = 0, top = 10, filterConfig) {
            var res = this._ads.slice();

            if (filterConfig.hashTags) {
                res = res.filter(function (ad) {
                    return ad.hashTags.includes(filterConfig.hashTags);
                })
            }

            if (filterConfig.vendor) {
                res = res.filter(function (ad) {
                    return ad.vendor == filterConfig.vendor;
                })
            }

            if (filterConfig.date) {
                res = res.filter(function (ad) {
                    return filterConfig.date[0] < ad.createdAt && ad.createdAt < filterConfig.date[1];
                })
            }


            if (skip === 0) {
                return res.slice(0, skip + top + 1).sort((a, b) => { return a.createdAt - b.createdAt });
            } else {
                return res.slice(skip + 1, skip + top + 1).sort((a, b) => { return a.createdAt - b.createdAt });
            }

        }

        edit(id, editItem) {
            var toEdit = this._ads.findIndex(item => {
                return item.id === id;
            })

            if (toEdit === -1) {
                return false;
            }

            for (var key in editItem) {
                if (key !== "vendor" && key !== "id" && key !== "createdAt") {
                    this._ads[toEdit][key] = editItem[key];
                }
            }
            return true;
        }

        removeAd(id) {
            var toDelete = this._ads.findIndex(item => {
                return item.id === id;
            })

            if (toDelete === -1) {
                return false;
            }

            this._ads.splice(toDelete, 1);
            return true;

        }
    }





    collection = new AdCollection([
        {
            id: "1",
            description: "McDrive in 90 seconds",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://mcdonalds.by/",
            vendor: "McDonalds",
            hashTags: ["bigmac", "McDonalds"],
            discount: "10%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "2",
            description: "Free Pizza EVERY TUESDAY!!!",
            createdAt: new Date("2021-02-01T23:00:00"),
            link: "https://dominos.by/",
            vendor: "Dominos Pizza",
            photoLink: "https://dominos.by/static/images/img-9ef03a.png",
            hashTags: ["pizza", "Dominos"],
            discount: "15%",
            validUntill: new Date("2021-05-01")
        },
        {
            id: "3",
            description: "Chicken for everyone!!!",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://www.kfc.by/",
            vendor: "KFC",
            hashTags: ["chicken", "KFC", "food"],
            discount: "25%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "4",
            description: "Mistery Combo",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://burger-king.by/",
            vendor: "Burger King",
            hashTags: ["vopper", "BK", "mistery", "food"],
            discount: "20%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "5",
            description: "4 for the price of 1",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://www.ganbei.by/",
            vendor: "Gan bei",
            hashTags: ["wok", "sushi", "4for1", "food"],
            discount: "40%",
            validUntill: new Date("2021-07-01"),
        },
        {
            id: "6",
            description: "Free beer for EVERYONE",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://pivko.by/",
            vendor: "Pena",
            hashTags: ["beer", "burger", "country", "music"],
            discount: "50%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "7",
            description: "Valentine's Day",
            createdAt: new Date("2021-02-03T23:00:00"),
            link: "https://silverscreen.by/",
            vendor: "Silver Screen",
            hashTags: ["cinema", "chill", "romantic", "food"],
            discount: "20%",
            validUntill: new Date("2021-05-04")
        },
        {
            id: "8",
            description: "Buissiness account has become more accessiable",
            createdAt: new Date("2021-02-03T23:00:00"),
            link: "https://todoist.com/",
            vendor: "Todoist",
            hashTags: ["work", "productivity", "statistics"],
            discount: "20%",
            validUntill: new Date("2021-05-04")
        },
        {
            id: "9",
            description: "Your favorite serials in one place",
            createdAt: new Date("2021-02-03T23:00:00"),
            link: "https://www.netflix.com/",
            vendor: "Netflix",
            hashTags: ["movies", "netflix", "tolerance!!!"],
            discount: "20%",
            validUntill: new Date("2021-05-04")
        },
        {
            id: "10",
            description: "Move in 15 minutes",
            createdAt: new Date("2021-02-03T23:00:00"),
            link: "https://www.uber.com/",
            vendor: "Uber",
            hashTags: ["driving", "fast", "comfortable"],
            discount: "20%",
            validUntill: new Date("2021-05-04")
        },
        {
            id: "11",
            description: "MacCombo",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://mcdonalds.by/",
            vendor: "McDonalds",
            hashTags: ["McDonalds", "combo"],
            discount: "20%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "12",
            description: "MacCombo with HamBurger",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://mcdonalds.by/",
            vendor: "McDonalds",
            hashTags: ["humburger", "McDonalds", "combo"],
            discount: "20%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "13",
            description: "MacCombo with CheeseBurger",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://mcdonalds.by/",
            vendor: "McDonalds",
            hashTags: ["cheeseBurger", "McDonalds", "combo"],
            discount: "20%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "14",
            description: "MacCombo with BigMac",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://mcdonalds.by/",
            vendor: "McDonalds",
            hashTags: ["bigmac", "McDonalds", "combo"],
            discount: "20%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "15",
            description: "MacCombo with BigTeisti",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://mcdonalds.by/",
            vendor: "McDonalds",
            hashTags: ["bigteisti", "McDonalds", "combo"],
            discount: "20%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "16",
            description: "MacCombo with Big Potato",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://mcdonalds.by/",
            vendor: "McDonalds",
            hashTags: ["bigPotato", "McDonalds", "combo"],
            discount: "20%",
            validUntill: new Date("2021-07-01")
        },
        {
            id: "17",
            description: "Tasty Lunch",
            createdAt: new Date("2021-06-01T23:00:00"),
            link: "https://www.ganbei.by/",
            vendor: "Gan bei",
            hashTags: ["wok", "sushi", "lunch", "food"],
            discount: "20%",
            validUntill: new Date("2021-07-01"),
        },
        {
            id: "18",
            description: "Free Pizza EVERY TUESDAY!!!",
            createdAt: new Date("2021-02-01T23:00:00"),
            link: "https://dodopizza.by/",
            vendor: "Dodo Pizza",
            hashTags: ["pizza", "Dodo"],
            discount: "50%",
            validUntill: new Date("2021-05-01")
        },
        {
            id: "19",
            description: "New doners!!!",
            createdAt: new Date("2021-02-01T23:00:00"),
            link: "https://dodopizza.by/",
            vendor: "Doner King",
            hashTags: ["doner", "king"],
            discount: "20%",
            validUntill: new Date("2021-05-01")
        },
        {
            id: "20",
            description: "Flights to Dubai",
            createdAt: new Date("2021-02-01T23:00:00"),
            link: "https://dodopizza.by/",
            vendor: "Belavia",
            hashTags: ["belavia", "flights"],
            discount: "5%",
            validUntill: new Date("2021-05-01")
        },
    ]);


    console.log("Test getPage(): ");
    console.log(collection.getPage(0, 10, { hashTags: ["food", "romantic"] }));
    console.log(collection.getPage(0, 10, { vendor: "McDonalds" }));
    console.log(collection.getPage(0, 10, { vendor: "McDonalds", hashTags: ["combo"] }));
    console.log(collection.getPage(0, 10, { vendor: "Pizza Tempo" }));

    console.log("Test getAd(): ");
    console.log(collection.getAd("5"));
    console.log(collection.getAd("45"));

    console.log("Test removeAd(): ");
    console.log(collection.removeAd("5"));
    console.log(collection.getAd("5"));

    console.log("Test edit(): ");
    console.log(collection.getAd("7"));
    console.log(collection.edit("7", { discount: "55%" }));
    console.log(collection.getAd("7"));

    console.log("Test addAd(): ");
    console.log(collection.addAd({
        id: 12,
        description: "Best price in Green",
        createdAt: new Date("2021-06-01T23:00:00"),
        link: "https://www.green-market.by/",
        vendor: "Green",
        hashTags: ["cheaply", "fresh", "organic"],
        discount: "20%",
        validUntill: new Date("2021-07-01")
    }));
    console.log(collection.getAd("21"));
    console.log(collection.addAd({
        id: "21",
        description: "Best price in Green",
        createdAt: new Date("2021-06-01T23:00:00"),
        link: "https://www.green-market.by/",
        vendor: "Green",
        hashTags: ["cheaply", "fresh", "organic"],
        discount: "20%",
        validUntill: new Date("2021-07-01")
    }));
    console.log(collection.getAd("21"));
}())