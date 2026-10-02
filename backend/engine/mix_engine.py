from typing import List, Dict, Any, Optional

def analyze_tank_mix(
    selected_products: List[Dict[str, Any]], 
    known_rules: Optional[List[Dict[str, Any]]] = None,
    ingredient_rules: Optional[List[Dict[str, Any]]] = None,
    formulation_rules: Optional[List[Dict[str, Any]]] = None
) -> Dict[str, Any]:
    if known_rules is None:
        known_rules = []
    if ingredient_rules is None:
        ingredient_rules = []
    if formulation_rules is None:
        formulation_rules = []

    if len(selected_products) < 2:
        return {
            "overall_status": "compatible",
            "safety_score": 100,
            "pairwise_interactions": [],
            "critical_warnings": [],
            "conditional_notes": [],
            "mixing_sequence": selected_products,
            "jar_test_checklist": [],
            "safer_alternatives": [],
            "ph_shift_risk": "none",
            "ph_lock_warning": None
        }

    pairwise_interactions = []
    critical_warnings = []
    conditional_notes = []
    safer_alternatives = []

    has_incompatible = False
    has_conditional = False
    has_insufficient = False

    n = len(selected_products)
    for i in range(n):
        for j in range(i + 1, n):
            prod_a = selected_products[i]
            prod_b = selected_products[j]

            # Hierarchical Rule Evaluation
            matched_rule = None
            id_a = prod_a.get("id", "")
            id_b = prod_b.get("id", "")
            form_a = prod_a.get("formulation", "")
            form_b = prod_b.get("formulation", "")
            active_a = prod_a.get("activeIngredients", "").lower()
            active_b = prod_b.get("activeIngredients", "").lower()

            # 1. Check Product-Level Override Rules
            for r in known_rules:
                if (r.get("product_a_code") == id_a and r.get("product_b_code") == id_b) or \
                   (r.get("product_a_code") == id_b and r.get("product_b_code") == id_a) or \
                   (r.get("product_a_id") == id_a and r.get("product_b_id") == id_b) or \
                   (r.get("product_a_id") == id_b and r.get("product_b_id") == id_a):
                    matched_rule = r
                    break

            # 2. Check Ingredient-Level Rules (if no product rule)
            if not matched_rule:
                for r in ingredient_rules:
                    ing_a = r.get("ingredient_a", "").lower()
                    ing_b = r.get("ingredient_b", "").lower()
                    if (ing_a in active_a and ing_b in active_b) or \
                       (ing_a in active_b and ing_b in active_a):
                        matched_rule = r
                        break

            # 3. Check Formulation-Level Rules (if no product or ingredient rule)
            if not matched_rule:
                for r in formulation_rules:
                    f_a = r.get("formulation_a", "")
                    f_b = r.get("formulation_b", "")
                    if (f_a == form_a and f_b == form_b) or \
                       (f_a == form_b and f_b == form_a):
                        matched_rule = r
                        break

            if matched_rule:
                interaction = {
                    "product_a_id": id_a,
                    "product_b_id": id_b,
                    "status": matched_rule.get("status", "insufficient_data"),
                    "primary_reason": matched_rule.get("reason", matched_rule.get("primaryReason", "")),
                    "detailed_explanation": matched_rule.get("recommendation", matched_rule.get("detailedExplanation", "")),
                    "chemical_mechanism": matched_rule.get("chemical_mechanism", matched_rule.get("chemicalMechanism")),
                    "safe_alternatives": matched_rule.get("safeAlternatives", []),
                    "jar_test_required": True,
                    "verified_source": matched_rule.get("source", matched_rule.get("verifiedSource", "Database Engine"))
                }
            else:
                interaction = infer_chemical_interaction(prod_a, prod_b)

            pairwise_interactions.append({
                "product_a": prod_a,
                "product_b": prod_b,
                "interaction": interaction
            })

            status = interaction["status"]
            name_a = prod_a.get("name") or prod_a.get("brandName", id_a)
            name_b = prod_b.get("name") or prod_b.get("brandName", id_b)

            if status == "incompatible":
                has_incompatible = True
                critical_warnings.append(f"{name_a} + {name_b}: {interaction['primary_reason']}")
                if interaction.get("safe_alternatives"):
                    safer_alternatives.extend(interaction["safe_alternatives"])
            elif status == "conditional":
                has_conditional = True
                conditional_notes.append(f"{name_a} + {name_b}: {interaction['primary_reason']}")
                if interaction.get("safe_alternatives"):
                    safer_alternatives.extend(interaction["safe_alternatives"])
            elif status == "insufficient_data":
                has_insufficient = True

    # Compute overall status & safety score
    if has_incompatible:
        overall_status = "incompatible"
        safety_score = 15
    elif has_conditional:
        overall_status = "conditional"
        safety_score = 65
    elif has_insufficient:
        overall_status = "insufficient_data"
        safety_score = 50
    else:
        overall_status = "compatible"
        safety_score = 95

    # Check pH shift
    phs = [p.get("idealPh", 6.5) for p in selected_products if isinstance(p.get("idealPh"), (int, float))]
    ph_shift_risk = "none"
    ph_lock_warning = None
    if phs:
        spread = max(phs) - min(phs)
        if spread >= 2.5:
            ph_shift_risk = "severe"
            ph_lock_warning = f"High pH gradient across tank components ({min(phs)} to {max(phs)}). Chemical degradation may occur."
        elif spread >= 1.5:
            ph_shift_risk = "mild"

    # WALES Mixing Order sequence
    def get_order_rank(p: Dict[str, Any]) -> int:
        rank = p.get("mixingOrderRank")
        if isinstance(rank, int):
            return rank
        form = p.get("formulation", "")
        cat = p.get("category", "")
        if cat == "adjuvant":
            return 6
        if form in ["WP", "WDG", "WG"]:
            return 2
        if form in ["SC", "CS", "ZC"]:
            return 3
        if form in ["EC", "OD"]:
            return 4
        if form in ["SL", "SP", "WSF", "WSC", "WSP"]:
            return 5
        return 3

    mixing_sequence = sorted(selected_products, key=get_order_rank)

    jar_test_checklist = [
        "Use clear 1-Liter glass or plastic jar containing actual field water.",
        "Add proportional quantities of each product following WALES sequence.",
        "Seal container and invert gently 10 times to simulate tank agitation.",
        "Let stand undisturbed for 30 minutes in ambient temperature.",
        "Inspect for curdling, thermal reaction (heating), precipitation, or layering."
    ]

    return {
        "overall_status": overall_status,
        "safety_score": safety_score,
        "pairwise_interactions": pairwise_interactions,
        "critical_warnings": critical_warnings,
        "conditional_notes": conditional_notes,
        "mixing_sequence": mixing_sequence,
        "jar_test_checklist": jar_test_checklist,
        "safer_alternatives": list(set(safer_alternatives)),
        "ph_shift_risk": ph_shift_risk,
        "ph_lock_warning": ph_lock_warning
    }


def infer_chemical_interaction(prod_a: Dict[str, Any], prod_b: Dict[str, Any]) -> Dict[str, Any]:
    id_a = prod_a.get("id", "").lower()
    id_b = prod_b.get("id", "").lower()
    cat_a = prod_a.get("category", "").lower()
    cat_b = prod_b.get("category", "").lower()
    form_a = prod_a.get("formulation", "")
    form_b = prod_b.get("formulation", "")
    active_a = prod_a.get("activeIngredients", "").lower()
    active_b = prod_b.get("activeIngredients", "").lower()

    # Rule 1: Calcium with Sulphates / Phosphates
    is_ca_a = "calcium" in id_a or "calcium" in active_a
    is_ca_b = "calcium" in id_b or "calcium" in active_b
    is_sulphate_or_phos_a = "sulphate" in id_a or "mkp" in id_a or "phosphate" in id_a or (cat_a == "fertilizer" and "P" in prod_a.get("npkOrNutrients", ""))
    is_sulphate_or_phos_b = "sulphate" in id_b or "mkp" in id_b or "phosphate" in id_b or (cat_b == "fertilizer" and "P" in prod_b.get("npkOrNutrients", ""))

    if (is_ca_a and is_sulphate_or_phos_b) or (is_ca_b and is_sulphate_or_phos_a):
        return {
            "product_a_id": prod_a.get("id"),
            "product_b_id": prod_b.get("id"),
            "status": "incompatible",
            "primary_reason": "Probable Mineral Precipitation (Calcium Cross-reaction)",
            "detailed_explanation": "Soluble calcium salts react with sulphate and phosphate ions in spray water, precipitating insoluble gypsum (CaSO4) or calcium phosphate rock.",
            "chemical_mechanism": "Ca²⁺ + SO₄²⁻ ➔ CaSO₄(s) ↓ / Ca²⁺ + HPO₄²⁻ ➔ CaHPO₄(s) ↓",
            "safe_alternatives": ["Apply Calcium separately from Sulphur and Phosphorus fertilizers."],
            "jar_test_required": True,
            "verified_source": "Fertilizer_Control_Order"
        }

    # Rule 2: Copper Fungicide with PGR / Organophosphate / Acidifiers
    is_copper_a = "copper" in id_a or "copper" in active_a
    is_copper_b = "copper" in id_b or "copper" in active_b
    if is_copper_a or is_copper_b:
        return {
            "product_a_id": prod_a.get("id"),
            "product_b_id": prod_b.get("id"),
            "status": "conditional",
            "primary_reason": "Copper Chemical Sensitivity / Phytotoxicity Risk",
            "detailed_explanation": "Copper formulations are chemically reactive and sensitive to spray water pH. They must be pre-diluted and jar-tested before tank co-application.",
            "safe_alternatives": ["Apply Copper fungicide as a standalone spray for best safety."],
            "jar_test_required": True,
            "verified_source": "CIBRC_Label"
        }

    # Rule 3: Multiple EC Formulations
    if form_a == "EC" and form_b == "EC":
        return {
            "product_a_id": prod_a.get("id"),
            "product_b_id": prod_b.get("id"),
            "status": "conditional",
            "primary_reason": "Multiple Emulsifiable Concentrate (EC) Solvent Load",
            "detailed_explanation": "Combining multiple EC formulations increases solvent concentration, which can cause foliage leaf burn during warm weather (>30°C).",
            "safe_alternatives": ["Spray during cool morning or evening hours with high water volume."],
            "jar_test_required": True,
            "verified_source": "University_Agronomy_Trial"
        }

    # Rule 4: Silicon / Non-ionic Adjuvant with Foliar Fertilizers or Pesticides
    if (cat_a == "adjuvant" and cat_b in ["insecticide", "fungicide", "fertilizer", "micronutrient"]) or \
       (cat_b == "adjuvant" and cat_a in ["insecticide", "fungicide", "fertilizer", "micronutrient"]):
        return {
            "product_a_id": prod_a.get("id"),
            "product_b_id": prod_b.get("id"),
            "status": "compatible",
            "primary_reason": "Synergistic Wetting and Spray Deposition",
            "detailed_explanation": "Non-ionic organosilicone and spreading adjuvants reduce spray droplet surface tension, enhancing chemical coverage and rainfastness.",
            "safe_alternatives": [],
            "jar_test_required": False,
            "verified_source": "University_Agronomy_Trial"
        }

    # Rule 5: Standard Fungicide + Insecticide Tank Mix (e.g. Mancozeb + Imidacloprid, Azoxystrobin + Thiamethoxam)
    if (cat_a == "fungicide" and cat_b == "insecticide") or (cat_a == "insecticide" and cat_b == "fungicide"):
        return {
            "product_a_id": prod_a.get("id"),
            "product_b_id": prod_b.get("id"),
            "status": "compatible",
            "primary_reason": "Standard Agronomic Pest & Disease Co-Application",
            "detailed_explanation": "These classes are widely co-applied in integrated pest and disease management under standard dilution rates following WALES order.",
            "safe_alternatives": [],
            "jar_test_required": False,
            "verified_source": "CIBRC_Label"
        }

    # Rule 6: Chelated Micronutrients (EDTA) + NPK Water Soluble Fertilizers
    is_chelate_a = "edta" in id_a or "edta" in active_a
    is_chelate_b = "edta" in id_b or "edta" in active_b
    if (is_chelate_a and cat_b == "fertilizer") or (is_chelate_b and cat_a == "fertilizer"):
        return {
            "product_a_id": prod_a.get("id"),
            "product_b_id": prod_b.get("id"),
            "status": "compatible",
            "primary_reason": "Stable Chelated Nutrient Tank Mix",
            "detailed_explanation": "EDTA chelation shields micronutrient metal cations from reacting with orthophosphates or sulphates, ensuring full solubility.",
            "safe_alternatives": [],
            "jar_test_required": False,
            "verified_source": "Fertilizer_Control_Order"
        }

    # Fallback: Insufficient Verified Label Data
    return {
        "product_a_id": prod_a.get("id"),
        "product_b_id": prod_b.get("id"),
        "status": "insufficient_data",
        "primary_reason": "No Documented Antagonism, but Physical Jar Test Mandatory",
        "detailed_explanation": "These two formulations do not have registered chemical conflict on official labels, but have not been formally co-tested in a certified agronomic trial. Perform a physical jar test before mixing in field tank.",
        "jar_test_required": True,
        "verified_source": "Experimental"
    }
