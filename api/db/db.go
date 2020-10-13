package db

import (
	"context"
	"fmt"
	"time"

	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Connect to a given database
func Connect() *mongo.Database {
	// Build URI
	uri := fmt.Sprintf("mongodb+srv://%s:%s@cluster0.pwh5o.mongodb.net/%s?retryWrites=true&w=majority",
		viper.Get("db.user"),
		viper.Get("db.password"),
		viper.Get("db.name"),
	)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Close on failed connection
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	// Close on disconnect
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	// Ping the primary
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		panic(err)
	}
	// TODO: Send to logs
	fmt.Println("Successfully connected and pinged.")
	fmt.Println(client.ListDatabaseNames(ctx, bson.D{}))
	fmt.Println(client.Database(viper.GetString("db.name")).ListCollectionNames(ctx, bson.D{}))

	return client.Database(viper.GetString("db.name"))
}
