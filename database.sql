-- ====================================================
-- creation of the database
-- ====================================================

use master
go
/* Drop the database and recreate it */
if exists (select * from sysdatabases where name = 
'DBSALEREAL')
begin
	drop database DBSALEREAL
end

create database DBSALEREAL
go

-- ====================================================
-- Create tables
-- ====================================================

/* Activate database */
use DBSaleReal
go

create table Client(
	id				int identity(1,1)	not null,
	clientName		varchar(50)			not null,
	PRIMARY KEY (id)
)
go

create table Product(
	id				int identity(1,1)	not null,
	productName		varchar(50)			not null,
	unitPrice		decimal(16, 2)		not null,
	cost			decimal(16, 2)		not null,
	PRIMARY KEY (id)
)
go

create table Sale(
	id				bigint identity(1,1)	not null,
	saleDate		datetime				not null,
	id_client		int						not null,
	total			decimal(16, 2)			not null,
	PRIMARY KEY (id),
	FOREIGN KEY (id_client) REFERENCES Client(id)
)
go

create table SaleConcept(
	id				bigint identity(1,1)	not null,
	id_sale			bigint					not null,
	units			int						not null,
	unitPrice		decimal(16, 2)			not null,
	amount			decimal(16, 2)			not null,
	id_product		int						not null,
	PRIMARY KEY (id),
	FOREIGN KEY (id_sale) REFERENCES Sale(id),
	FOREIGN KEY (id_product) REFERENCES Product(id)
)
go

create table SaleUser(
	id				int identity(1,1)	not null,
	email			varchar(100)		not null,
	passwordUser	varchar(256)		not null,
	nameUser		varchar(50)			not null
)
go

-- ====================================================
-- Insert Clients
-- ====================================================

insert into Client values ('Juan')
insert into Client values ('Pablo')
insert into Client values ('Pedro')
insert into Client values ('Julian')
insert into Client values ('Brunela')

-- ====================================================
-- Insert Users
-- ====================================================

insert into SaleUser values ('devOrlando@gmail.com', '05ef130c628dac6868d8ab9a08049009d414ceaae8b90e2b0ebb3c5d4c80da6f', 'orlando')

-- ====================================================
-- Insert Products
-- ====================================================

insert into Product values ('Galleta Animalito', 0.70, 0.90)