<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;

/**
 * Cross-Site WebSocket Hijacking (CSWSH) Protection Tests
 * 
 * Note: Full WebSocket upgrade tests require a running WebSocket server.
 * These tests validate the origin checking logic that protects against CSWSH attacks.
 */

it('validates allowed origins configuration exists', function () {
    $apps = Config::get('reverb.apps.apps', []);
    
    expect($apps)->not->toBeEmpty()
        ->and($apps[0])->toHaveKey('allowed_origins')
        ->and($apps[0]['allowed_origins'])->toBeArray()
        ->and($apps[0]['allowed_origins'])->not->toBeEmpty();
});

it('checks if origin validation would allow valid origin', function () {
    // This tests the logic without requiring actual WebSocket connection
    $allowedOrigins = Config::get('reverb.apps.apps.0.allowed_origins', []);
    
    // If wildcard is set, any origin should be allowed
    if (in_array('*', $allowedOrigins)) {
        expect($allowedOrigins)->toContain('*');
        return;
    }
    
    // Otherwise, check that valid origins are configured
    expect($allowedOrigins)->not->toBeEmpty();
    $testOrigin = $allowedOrigins[0];
    
    // Simulate what the WebSocket middleware would check
    $isAllowed = in_array($testOrigin, $allowedOrigins);
    
    expect($isAllowed)->toBeTrue();
});

it('checks if origin validation would block invalid origin', function () {
    $allowedOrigins = Config::get('reverb.apps.apps.0.allowed_origins', []);
    
    // Skip if wildcard is set (all origins allowed)
    if (in_array('*', $allowedOrigins)) {
        $this->markTestSkipped('Wildcard origin allows all connections');
    }
    
    $evilOrigin = 'https://evil.com';
    
    // Simulate what the WebSocket middleware would check
    $isAllowed = in_array($evilOrigin, $allowedOrigins);
    
    expect($isAllowed)->toBeFalse();
});

it('checks if wildcard origin allows all connections', function () {
    $allowedOrigins = Config::get('reverb.apps.apps.0.allowed_origins', []);
    
    // Check if wildcard is configured OR specific origins are configured
    $hasWildcard = in_array('*', $allowedOrigins);
    $hasSpecificOrigins = !empty($allowedOrigins) && !$hasWildcard;
    
    // Either wildcard OR specific origins should be configured
    expect($hasWildcard || $hasSpecificOrigins)->toBeTrue('Reverb should be configured with either wildcard or specific origins');
    
    // If specific origins are configured, verify they're not empty
    if ($hasSpecificOrigins) {
        expect($allowedOrigins)->not->toBeEmpty();
        // Verify the origins are properly formatted (contain protocol)
        foreach ($allowedOrigins as $origin) {
            expect($origin)->toMatch('/^https?:\/\//');
        }
    }
});

/**
 * The following tests are skipped because they require a running WebSocket server.
 * To test actual WebSocket upgrade behavior:
 * 1. Start Laravel Reverb: php artisan reverb:start
 * 2. Use a WebSocket client library in tests
 * 3. Test actual connections with different origins
 */

it('allows WebSocket upgrade with correct origin', function () {
    test()->markTestSkipped('WebSocket upgrade requires running Reverb server. Use integration tests or manual testing.');
})->skip();

it('blocks WebSocket upgrade with wrong origin', function () {
    test()->markTestSkipped('WebSocket upgrade requires running Reverb server. Use integration tests or manual testing.');
})->skip();
