from sqlalchemy.orm import Session
from api import models, database

def seed_db():
    db = next(database.get_db())
    
    # Check if products already exist
    if db.query(models.Product).first():
        print("Database already seeded.")
        return

    products = [
        {
            "title": "Tactile Mono Switches",
            "description": "Set of 90 / Pre-lubed Linear. A masterclass in tactile feedback.",
            "price": 72.00,
            "category": "Switches",
            "tag": "Limited Edition",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBb9IDxtjEEdUZMpIBWfYpCDqo-z9Lg1SZoGQj0zm48PddjJxmGT7gdWL5FvhsASCi0T-Ug3U3lt0gs9hZCWnIlRMze6Gk1xdCg6vPDMHsMovU60SqlbhwWzunU8ujHyPGwIpfhkqcSB2Ue00eHGU7OQx5Bezl0ODmey_RJ5BHUaXjCE3_Za5Tx0jwx3_SMP2TwYRHiWCvv_X5skpFxklHZtxsVvtKMiBH5UI9QsCnTbmPBp40HwLuAjTd7l-ShJYmMzqMUEVgWSYFK"
        },
        {
            "title": "Archival Vinyl Pack",
            "description": "8-piece curated sticker set. Matte finish archival vinyl.",
            "price": 24.00,
            "category": "Stickers",
            "tag": "New",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuD4cY--2akvyWgqQe9zg26eAHVO4C-aOVMpAMgShCt1s_suRA4G2WUg_gvQcqBYhQb6H_HisB_e6a37wnO-TM122zJ_09scfh7QDC2MVMtl3yzyAcxI8nqRkxSW5rz2EYEhu6GsNcyTc7naR4Y37JZXxc713cymqpHQDitaTbMvKv6Oowd34rNF4IoxUm-oiLOcVDHdz_5MQASlE1ilYdvVycjytIIIuS-v8nvumg6xRFWnb5aqDYpE1kTbC8HnM1nwF4hSCMi4fowb"
        },
        {
            "title": "Merino Wool Felt Mat",
            "description": "Large / Stone Grey. Premium merino wool for a soft desk surface.",
            "price": 110.00,
            "category": "Mats",
            "tag": "Restocked",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCYuakGU5r9FJ9v-ACp2EsilZi9L53gehs4TmhnxCl0EhX4Ta3L3WfFgni9u6tt1ZLDx52pTkukjPMESObPXZG9gkFT7XLMlyasknLNpAFOWqPH2pV3F19ffBTGqQmWd5EUwGNm7uh8br64GPrcXU6hDibz6OUe4ThZEOrptujs1QaK7UJoBNfj5B_KTi-AzvNg1tGlK4Lm1NdGnHmQrYnf2kMa-FfyH09ZChj3cPX2d51IhxhClsa3P7nDirSHuDUAzqfN-rfMZLeK"
        },
        {
            "title": "Cyberpunk Edition Keyboard",
            "description": "CNC-milled aluminum chassis. Limited production run No. 04.",
            "price": 289.00,
            "category": "Keyboards",
            "tag": "Featured",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDETNJ2Yd2-TznrQCYrhWlMhR45En4hcB0Pb-bPqGDdB6GCS60SHWavHuCTxO0pHnSw-5JDNmPI9SOfwemPC_zZi5m8Z2nB53H9aWunfmzg_fIwc8JboHg7BHsr941EfaHqvnnmUVN-WBP3BWrBSm8Towwp0UX3Xnuxyzeqw5tF1WAu9vUTcSTxtqli__U56X0Fqx7AKIUpv0Uc68hc9YIRyTMuxkdJjX_vqMIF1oldHNdP4h1Wvfpd5LKOjTbrGAmknqXmeazg92Jr"
        }
    ]

    for p in products:
        product = models.Product(**p)
        db.add(product)
    
    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    # Create tables
    models.Base.metadata.create_all(bind=database.engine)
    seed_db()
