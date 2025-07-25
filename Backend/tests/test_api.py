#!/usr/bin/env python3
"""
Inventory Management Tool API Test Script
Tests all endpoints and functionality
"""

import requests
import json
import time
import sys
from typing import Dict, Any

class InventoryAPITester:
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url
        self.session = requests.Session()
        self.auth_token = None
        self.test_user = {
            "username": f"testuser_{int(time.time())}",
            "password": "testpass123"
        }
        self.test_product = {
            "name": "Test Product",
            "type": "Electronics",
            "sku": f"TEST{int(time.time())}",
            "imageUrl": "https://example.com/test.jpg",
            "description": "A test product for API testing",
            "quantity": 100,
            "price": 99.99
        }

    def print_result(self, test_name: str, success: bool, response: requests.Response = None):
        """Print test result with formatting"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if response and not success:
            print(f"   Status: {response.status_code}")
            try:
                print(f"   Response: {response.json()}")
            except:
                print(f"   Response: {response.text}")

    def test_health_check(self) -> bool:
        """Test health check endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/health")
            success = response.status_code == 200
            self.print_result("Health Check", success, response)
            return success
        except Exception as e:
            self.print_result("Health Check", False)
            print(f"   Error: {e}")
            return False

    def test_register_user(self) -> bool:
        """Test user registration"""
        try:
            response = self.session.post(
                f"{self.base_url}/auth/register",
                json=self.test_user
            )
            success = response.status_code == 201
            self.print_result("Register User", success, response)
            return success
        except Exception as e:
            self.print_result("Register User", False)
            print(f"   Error: {e}")
            return False

    def test_login_user(self) -> bool:
        """Test user login"""
        try:
            response = self.session.post(
                f"{self.base_url}/auth/login",
                json=self.test_user
            )
            success = response.status_code == 200
            if success:
                data = response.json()
                self.auth_token = data.get('data', {}).get('token')
                if self.auth_token:
                    self.session.headers.update({
                        'Authorization': f'Bearer {self.auth_token}'
                    })
            self.print_result("Login User", success, response)
            return success
        except Exception as e:
            self.print_result("Login User", False)
            print(f"   Error: {e}")
            return False

    def test_create_product(self) -> bool:
        """Test product creation"""
        try:
            response = self.session.post(
                f"{self.base_url}/products",
                json=self.test_product
            )
            success = response.status_code == 201
            if success:
                data = response.json()
                self.test_product['id'] = data.get('data', {}).get('id')
            self.print_result("Create Product", success, response)
            return success
        except Exception as e:
            self.print_result("Create Product", False)
            print(f"   Error: {e}")
            return False

    def test_get_products(self) -> bool:
        """Test getting products list"""
        try:
            response = self.session.get(f"{self.base_url}/products")
            success = response.status_code == 200
            self.print_result("Get Products", success, response)
            return success
        except Exception as e:
            self.print_result("Get Products", False)
            print(f"   Error: {e}")
            return False

    def test_update_product_quantity(self) -> bool:
        """Test updating product quantity"""
        try:
            if not self.test_product.get('id'):
                self.print_result("Update Product Quantity", False)
                print("   Error: No product ID available")
                return False

            new_quantity = 75
            response = self.session.put(
                f"{self.base_url}/products/{self.test_product['id']}/quantity",
                json={"quantity": new_quantity}
            )
            success = response.status_code == 200
            self.print_result("Update Product Quantity", success, response)
            return success
        except Exception as e:
            self.print_result("Update Product Quantity", False)
            print(f"   Error: {e}")
            return False

    def test_unauthorized_access(self) -> bool:
        """Test unauthorized access to protected endpoints"""
        try:
            # Remove auth token
            self.session.headers.pop('Authorization', None)
            
            response = self.session.get(f"{self.base_url}/products")
            success = response.status_code == 401
            self.print_result("Unauthorized Access", success, response)
            return success
        except Exception as e:
            self.print_result("Unauthorized Access", False)
            print(f"   Error: {e}")
            return False

    def test_duplicate_user_registration(self) -> bool:
        """Test duplicate user registration"""
        try:
            response = self.session.post(
                f"{self.base_url}/auth/register",
                json=self.test_user
            )
            success = response.status_code == 409
            self.print_result("Duplicate User Registration", success, response)
            return success
        except Exception as e:
            self.print_result("Duplicate User Registration", False)
            print(f"   Error: {e}")
            return False

    def test_invalid_product_data(self) -> bool:
        """Test invalid product data validation"""
        try:
            # Restore auth token
            if self.auth_token:
                self.session.headers.update({
                    'Authorization': f'Bearer {self.auth_token}'
                })

            invalid_product = {
                "name": "",  # Invalid: empty name
                "type": "Electronics",
                "sku": "INV",  # Invalid: too short
                "quantity": -5,  # Invalid: negative quantity
                "price": -10.0  # Invalid: negative price
            }

            response = self.session.post(
                f"{self.base_url}/products",
                json=invalid_product
            )
            success = response.status_code == 400
            self.print_result("Invalid Product Data Validation", success, response)
            return success
        except Exception as e:
            self.print_result("Invalid Product Data Validation", False)
            print(f"   Error: {e}")
            return False

    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Inventory Management Tool API Tests")
        print("=" * 50)
        
        tests = [
            ("Health Check", self.test_health_check),
            ("Register User", self.test_register_user),
            ("Login User", self.test_login_user),
            ("Create Product", self.test_create_product),
            ("Get Products", self.test_get_products),
            ("Update Product Quantity", self.test_update_product_quantity),
            ("Unauthorized Access", self.test_unauthorized_access),
            ("Duplicate User Registration", self.test_duplicate_user_registration),
            ("Invalid Product Data Validation", self.test_invalid_product_data),
        ]

        passed = 0
        total = len(tests)

        for test_name, test_func in tests:
            try:
                if test_func():
                    passed += 1
            except Exception as e:
                print(f"❌ FAIL {test_name}")
                print(f"   Unexpected error: {e}")

        print("=" * 50)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! API is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Please check the API implementation.")
            return False

def main():
    """Main function to run tests"""
    base_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
    
    tester = InventoryAPITester(base_url)
    success = tester.run_all_tests()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 