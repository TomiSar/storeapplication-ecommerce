-- products --
CREATE TABLE IF NOT EXISTS products (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(500) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    popularity INT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(20) DEFAULT NULL
);

-- contacts --
CREATE TABLE IF NOT EXISTS contacts (
    contact_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    message VARCHAR(500) NOT NULL,
    status VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(20) DEFAULT NULL
);

-- customers --
CREATE TABLE IF NOT EXISTS customers (
    customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL,
    password_hash VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(20) DEFAULT NULL,
    UNIQUE KEY unique_email (email),
    UNIQUE KEY unique_mobile_number (mobile_number)
);

-- address --
CREATE TABLE IF NOT EXISTS address (
    address_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL UNIQUE,
    street VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(20) DEFAULT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE
);

-- roles --
CREATE TABLE IF NOT EXISTS roles (
    role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(20) DEFAULT NULL,
    UNIQUE KEY unique_name (name)
);

-- customer_roles --
CREATE TABLE IF NOT EXISTS customer_roles (
    customer_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (customer_id, role_id),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE
);

-- orders --
CREATE TABLE IF NOT EXISTS orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    payment_id VARCHAR(200) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(20) DEFAULT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

-- order_items --
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(20) DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

-- Add some initial products --
INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Developer',
        'Code Wizard!',
        5.00,
        85,
        '/stickers/developer.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Break',
        'Hey, lets take a breather and start fresh on the next line',
        4.50,
        40,
        '/stickers/break.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Not a bug',
        'It''s a surprise functionality.',
        6.00,
        98,
        '/stickers/itsnotabug.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Devster',
        'They exist!',
        5.00,
        72,
        '/stickers/EatSleepCode.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'CodeSmasher',
        'Fearless developer!',
        7.50,
        88,
        '/stickers/BreakingCode.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'CodeMate',
        'Without you, I''m incomplete!',
        2.00,
        79,
        '/stickers/youaremycss.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Mbappé',
        'Phenomenal!',
        8.00,
        55,
        '/stickers/Mbappe.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'AstroChill',
        'Cool for gravity!',
        3.00,
        52,
        '/stickers/CoolAstraunaut.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Ronaldo',
        'Legendary!',
        8.00,
        100,
        '/stickers/ronaldo.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'My Driving Scares Me Too',
        'They exist!',
        5.00,
        65,
        '/stickers/MyDrivingScaresMeToo.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Three headed dragon symbol',
        'Targaryen dynasty strength',
        9.00,
        98,
        '/stickers/HouseOfTheDragonSymbol.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Squid Game',
        'Let''s play',
        5.00,
        70,
        '/stickers/SquidGame.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Shin-Chan',
        'Mischievous!',
        5.00,
        70,
        '/stickers/Shinchan.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Game over',
        'Game over!',
        5.00,
        50,
        '/stickers/GameOver.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Messi',
        'Magical!',
        10.00,
        99,
        '/stickers/Messi.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Virat Kohli',
        'King',
        9.00,
        99,
        '/stickers/Virat.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Lazy Cat',
        'Not Today',
        6.00,
        60,
        '/stickers/LazyCat.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Busy Brain',
        'Overthinker!',
        4.00,
        50,
        '/stickers/OverThinker.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Naruto',
        'Ninja!',
        6.00,
        60,
        '/stickers/Naruto.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Goku',
        'Warrior!',
        6.00,
        60,
        '/stickers/Goku.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'I am okay',
        'Persistent!',
        6.00,
        60,
        '/stickers/IamOkay.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Boo',
        'Disapproval!',
        6.00,
        60,
        '/stickers/Boo.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'EW feeling',
        'Disgust!',
        6.00,
        60,
        '/stickers/EwFeelings.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Be wild',
        'Unleashed!',
        6.00,
        60,
        '/stickers/BeWild.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'SummerCat',
        'Heatwave Whiskers',
        6.00,
        60,
        '/stickers/AestheticSummerCat.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Savageness',
        'Your opinion means nothing',
        6.00,
        60,
        '/stickers/YourOpinonMeansNothing.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Awkweird',
        'Awkward and Weird',
        6.00,
        60,
        '/stickers/SociallyAwkward.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Blue Butterfly',
        'Gracewing',
        6.00,
        60,
        '/stickers/Butterfly.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'NoHesitation',
        'Always ready to take charge!',
        6.00,
        60,
        '/stickers/IWon_tHesitateSticker.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Wardgaze',
        'Protective power of the evil eye',
        6.00,
        60,
        '/stickers/EvilEye.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

INSERT INTO
    products (
        name,
        description,
        price,
        popularity,
        image_url,
        created_at,
        created_by,
        updated_at,
        updated_by
    )
VALUES (
        'Lamborghini',
        'Legendary, wedge-shaped Italian supercar',
        150.00,
        100,
        '/stickers/Lamborghini.png',
        CURRENT_TIMESTAMP,
        'admin',
        NULL,
        NULL
    );

-- Add some initial roles --
INSERT INTO
    roles (name, created_at, created_by)
VALUES (
        'ROLE_USER',
        CURRENT_TIMESTAMP,
        'DBA'
    );

INSERT INTO
    roles (name, created_at, created_by)
VALUES (
        'ROLE_ADMIN',
        CURRENT_TIMESTAMP,
        'DBA'
    );

INSERT INTO
    roles (name, created_at, created_by)
VALUES (
        'ROLE_OPS_ENG',
        CURRENT_TIMESTAMP,
        'DBA'
    );

INSERT INTO
    roles (name, created_at, created_by)
VALUES (
        'ROLE_QA_ENG',
        CURRENT_TIMESTAMP,
        'DBA'
    );
