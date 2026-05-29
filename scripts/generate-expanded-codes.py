# -*- coding: utf-8 -*-
import os
import json
import hashlib

output_dir = "/Users/sonnyneo/.gemini/antigravity/scratch/omni-registry/data/codes"
os.makedirs(output_dir, exist_ok=True)

# 1. Axis Component Translations (The Lego Blocks)
TARGETS = {
    "heart": {
        "en": "heart",
        "es": "corazón",
        "fr": "cœur",
        "ar": "القلب",
        "hi": "हृदय",
        "zh": "心脏",
        "pt": "coração"
    },
    "lung": {
        "en": "lung",
        "es": "pulmón",
        "fr": "poumon",
        "ar": "الرئة",
        "hi": "फेफड़ा",
        "zh": "肺部",
        "pt": "pulmão"
    },
    "liver": {
        "en": "liver",
        "es": "hígado",
        "fr": "foie",
        "ar": "الكبد",
        "hi": "यकृत (लीवर)",
        "zh": "肝脏",
        "pt": "fígado"
    },
    "kidney": {
        "en": "kidney",
        "es": "riñón",
        "fr": "rein",
        "ar": "الكلية",
        "hi": "गुर्दा (किडनी)",
        "zh": "肾脏",
        "pt": "rim"
    },
    "skin": {
        "en": "skin lesion",
        "es": "lesión de piel",
        "fr": "lésion cutanée",
        "ar": "آفة جلدية",
        "hi": "त्वचा की क्षति (घाव)",
        "zh": "皮肤病变",
        "pt": "lesão de pele"
    },
    "stomach": {
        "en": "stomach",
        "es": "estómago",
        "fr": "estomac",
        "ar": "المعدة",
        "hi": "आमाशय (पेट)",
        "zh": "胃部",
        "pt": "estômago"
    },
    "shoulder joint": {
        "en": "shoulder joint",
        "es": "articulación del hombro",
        "fr": "articulation de l'épaule",
        "ar": "مفصل الكتف",
        "hi": "कंधे का जोड़",
        "zh": "肩关节",
        "pt": "articulação do ombro"
    },
    "thyroid gland": {
        "en": "thyroid gland",
        "es": "glándula tiroides",
        "fr": "glande thyroïde",
        "ar": "الغدة الدرقية",
        "hi": "थायराइड ग्रंथि",
        "zh": "甲状腺",
        "pt": "glândula tireoide"
    },
    "urinary bladder": {
        "en": "urinary bladder",
        "es": "vejiga urinaria",
        "fr": "vessie",
        "ar": "المثانة البولية",
        "hi": "मूत्राशय",
        "zh": "膀胱",
        "pt": "bexiga urinária"
    },
    "spleen": {
        "en": "spleen",
        "es": "bazo",
        "fr": "rate",
        "ar": "الطحال",
        "hi": "प्लीहा (तिल्ली)",
        "zh": "脾脏",
        "pt": "baço"
    },
    "pancreas": {
        "en": "pancreas",
        "es": "páncreas",
        "fr": "pancréas",
        "ar": "البنكرياس",
        "hi": "अग्नाशय (पैनक्रियाज)",
        "zh": "胰腺",
        "pt": "pâncreas"
    },
    "blood vessels": {
        "en": "blood vessels",
        "es": "vasos sanguíneos",
        "fr": "vaisseaux sanguins",
        "ar": "الأوعية الدموية",
        "hi": "रक्त वाहिकाएं",
        "zh": "血管",
        "pt": "vasos sanguíneos"
    },
    "rectum": {
        "en": "rectum",
        "es": "recto",
        "fr": "rectum",
        "ar": "المستقيم",
        "hi": "मलाशय",
        "zh": "直肠",
        "pt": "reto"
    },
    "nasal passage": {
        "en": "nasal passage",
        "es": "pasaje nasal",
        "fr": "fosses nasales",
        "ar": "الممر الأنفي",
        "hi": "नाक का रास्ता",
        "zh": "鼻腔通道",
        "pt": "passagem nasal"
    },
    "tonsils": {
        "en": "tonsils",
        "es": "amígdalas",
        "fr": "amygdales",
        "ar": "اللوزتين",
        "hi": "टॉन्सिल",
        "zh": "扁桃体",
        "pt": "amígdalas"
    }
}

ACTIONS = {
    "excision": {
        "en": "surgical removal",
        "es": "extirpación quirúrgica",
        "fr": "ablation chirurgicale",
        "ar": "استئصال جراحي",
        "hi": "सर्जरी द्वारा निकालना",
        "zh": "手术切除",
        "pt": "remoção cirúrgica"
    },
    "repair": {
        "en": "anatomical reconstruction",
        "es": "reconstrucción anatómica",
        "fr": "reconstruction anatomique",
        "ar": "إعادة بناء تشريحية",
        "hi": "शारीरिक पुनर्निर्माण (मरम्मत)",
        "zh": "结构修补与重建",
        "pt": "reconstrução anatômica"
    },
    "inspection": {
        "en": "endoscopic visualization",
        "es": "visualización endoscópica",
        "fr": "visualisation endoscopique",
        "ar": "فحص بالمنظار",
        "hi": "दूरबीन द्वारा जांच (विज़ुअलाइज़ेशन)",
        "zh": "内镜直视检查",
        "pt": "visualização endoscópica"
    },
    "imaging": {
        "en": "diagnostic imaging scan",
        "es": "escaneo de diagnóstico por imágenes",
        "fr": "scanner d'imagerie diagnostique",
        "ar": "تصوير تشخيصي",
        "hi": "डायग्नोस्टिक इमेजिंग स्कैन",
        "zh": "诊断影像学扫描",
        "pt": "exame de imagem diagnóstica"
    },
    "biopsy": {
        "en": "tissue core extraction",
        "es": "extracción de muestra de tejido",
        "fr": "prélèvement de tissu pour biopsie",
        "ar": "أخذ عينة من الأنسجة",
        "hi": "बायोप्सी हेतु ऊतक निकालना",
        "zh": "针吸组织活检",
        "pt": "extração de fragmento tecidual"
    }
}

MEANS = {
    "open": {
        "en": "through an open incision",
        "es": "a través de una incisión abierta",
        "fr": "par incision ouverte",
        "ar": "عبر شق جراحي مفتوح",
        "hi": "खुली सर्जरी द्वारा",
        "zh": "通过开放性切口进行",
        "pt": "através de incisão aberta"
    },
    "percutaneous endoscopic": {
        "en": "using keyhole minimally invasive access",
        "es": "usando acceso laparoscópico mínimamente invasivo",
        "fr": "par accès laparoscopique minimalement invasif",
        "ar": "باستخدام تقنية المنظار طفيفة التوغل",
        "hi": "कीहोल (न्यूनतम आक्रामक) तकनीक द्वारा",
        "zh": "采用微创内镜入路",
        "pt": "usando acesso laparoscópico minimamente invasivo"
    },
    "ultrasound guidance": {
        "en": "under high-frequency sound wave mapping",
        "es": "bajo guía de ecografía en tiempo real",
        "fr": "sous guidage échographique en temps réel",
        "ar": "بتوجيه من الموجات فوق الصوتية",
        "hi": "अल्ट्रासाउंड तरंगों के मार्गदर्शन में",
        "zh": "在超声波实时定位引导下",
        "pt": "sob orientação ultrassonográfica"
    },
    "contrast dye enhanced X-ray": {
        "en": "with infusion of contrast fluid and X-ray mapping",
        "es": "con infusión de líquido de contraste y radiografías",
        "fr": "avec injection de produit de contraste et radiographie",
        "ar": "مع حقن صبغة التباين والأشعة السينية",
        "hi": "कंट्रास्ट डाई और एक्स-रे मैपिंग के साथ",
        "zh": "配合造影剂灌注及X光造影",
        "pt": "com infusão de contraste e radiografia"
    }
}

# 2. Programmatic Combinations (15 Targets * 5 Actions * 4 Means = 300 codes)
generated_count = 0

for target_key, target_trans in TARGETS.items():
    for action_key, action_trans in ACTIONS.items():
        for means_key, means_trans in MEANS.items():
            
            # Formulate the OMNI composite key
            omni_composition = f"[{target_key}][{action_key}][{means_key}]"
            
            # Create a deterministic stable ID from MD5 hash to keep CPT and OMNI stable
            h = hashlib.md5(omni_composition.encode("utf-8")).hexdigest()
            hash_num = int(h[:6], 16)
            
            # Map OMNI ID in the 100,000+ series (e.g. OMNI-0105432)
            omni_id = f"OMNI-01{hash_num:05d}"
            
            # Mock incumbent codes deterministically
            mock_cpt = f"8{hash_num % 10000:04d}"
            mock_snomed = f"9400{hash_num % 100000:05d}"
            
            # ICHI stem: e.g. TGT.ACT.MNS
            tgt_stem = target_key[:3].upper()
            act_stem = action_key[:2].upper()
            mns_stem = means_key[:2].upper()
            mock_ichi = f"{tgt_stem}.{act_stem}.{mns_stem}"
            
            # ICD-11 and ICD-10-CM/PCS
            mock_icd11 = f"{tgt_stem[0]}{act_stem[0]}{mns_stem[0]}1.0"
            mock_icd10 = f"0{tgt_stem[0]}B{hash_num % 1000:03d}Z"
            
            # Assemble Multilingual Plain Descriptions
            plain_language = {}
            for lang in ["en", "es", "fr", "ar", "hi", "zh", "pt"]:
                target_word = target_trans[lang]
                action_word = action_trans[lang]
                means_word = means_trans[lang]
                
                # Dynamic phrasing templates for languages
                if lang == "en":
                    desc = f"{action_word.capitalize()} of the {target_word} {means_word}"
                elif lang == "es":
                    desc = f"{action_word.capitalize()} de {target_word} {means_word}"
                elif lang == "fr":
                    desc = f"{action_word.capitalize()} de {target_word} {means_word}"
                elif lang == "ar":
                    desc = f"{action_word} لـ {target_word} {means_word}"
                elif lang == "hi":
                    desc = f"{means_word} {target_word} का {action_word}"
                elif lang == "zh":
                    desc = f"{means_word}{action_word}{target_word}"
                elif lang == "pt":
                    desc = f"{action_word.capitalize()} de {target_word} {means_word}"
                
                plain_language[lang] = desc
            
            # Assemble OMNI JSON Code Schema Card
            code_card = {
                "omni_id": omni_id,
                "composition": {
                    "target": target_key,
                    "action": action_key,
                    "means": means_key
                },
                "plain_language": plain_language,
                "crosswalks": {
                    "cpt": mock_cpt,
                    "ichi": mock_ichi,
                    "snomed_ct": mock_snomed,
                    "icd11_pcs": mock_icd11,
                    "icd10_cm": mock_icd10
                },
                "notes": "Programmatically generated post-coordinated expansion code.",
                "provisional": True,
                "version": "0.2.0",
                "added": "2026-05"
            }
            
            # Write JSON file
            code_path = os.path.join(output_dir, f"{omni_id}.json")
            with open(code_path, "w", encoding="utf-8") as f:
                json.dump(code_card, f, indent=2, ensure_ascii=False)
            
            generated_count += 1

print(f"Successfully generated {generated_count} post-coordinated medical codes in data/codes/")
