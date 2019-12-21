db.ratings.aggregate(
    [
        { $match: {} },
        {
            $group: {
                _id: "$bookId",
                total: { $sum: "$rating" },
                count: { $sum: 1 },
                average: { $avg: "$rating" }
            }
        },
        {
            $sort: { average: -1 }
        }
    ]
).pretty()