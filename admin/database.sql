use reactsql;

CREATE TABLE PRODUCT (
	PRODUCT_ID CHAR(36) primary KEY,
	PRODUCT_NAME VARCHAR(30),
    PRODUCT_DESCRIPTION varchar(30),
    PRICE DECIMAL(10, 2),
	PRODUCT_IMAGE text(80)
);

INSERT INTO PRODUCT
VALUES (UUID(), 'Laptop', 'Laptop Dell Inspiron 15 3520', 19.99, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_14__6_35.png');

-- Thay đổi thuộc tính của cột PRODUCT_DESCRIPTION
ALTER TABLE PRODUCT
MODIFY COLUMN PRODUCT_DESCRIPTION VARCHAR(255);

ALTER TABLE Customer
MODIFY COLUMN CUSTOMER_IMAGE VARCHAR(255);

-- Thay đổi giá trị của row tại id = bằng bao nhiêu đó 
UPDATE PRODUCT
SET PRODUCT_NAME = 'Laptop ASUS TUF Gaming A15',
    PRODUCT_DESCRIPTION = 'AMD Ryzen 5 7535HS |RTX 2050 4GB | 8GB | 512GB | 15.6 inch FHD 144Hz | Win 11 | Đen',
    PRICE = 24.99,
    PRODUCT_IMAGE = 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_14__6_35.png'
WHERE PRODUCT_ID = '425705c0-88a4-11ef-b0e6-088fc319db39';

CREATE TABLE CUSTOMER (
	CUSTOMER_ID CHAR(36) primary KEY,
    CUSTOMER_NAME VARCHAR(30),
    CUSTOMER_EMAIL varchar(30),
    CUSTOMER_PASSWORD VARCHAR(50),
	CUSTOMER_IMAGE text,
    PRODUCT_ID CHAR(36),
    constraint FK_CUSTOMER_PRODUCT foreign key (PRODUCT_ID) references PRODUCT(PRODUCT_ID)
);

INSERT INTO CUSTOMER
VALUES (UUID(), "Trần Đình Hùng", "hung@gmail.com", "123456", "https://avatars.githubusercontent.com/u/139600392?v=4", "425705c0-88a4-11ef-b0e6-088fc319db39");

select * from product;
select * from customer;

ALTER TABLE CUSTOMER
RENAME COLUMN CUSTOMER_IMAGE TO AVATAR;


